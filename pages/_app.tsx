import type { AppProps /*, AppContext */ } from "next/app";
import { useEffect, useState, useRef } from "react";
import { lootTable } from "../amplify/backend/function/getRandomLootItem/src";
import useLocalStorage from "../hooks/useLocalStorage";
import { createSession, getRandomLootItem, getSession } from "../lib/bosses";

export type Inventory = { [id: string]: number };

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionId, setSessionId] = useLocalStorage<string>("sessionId", null);
  const [inventory, setInventory] = useState<Inventory>({});
  const [winCounter, setWinCounter] = useState(0);
  console.log("local storage session id: ", sessionId);

  const lootBoss = async (bossId: string, sessionId: string) => {
    const newLoot = await getRandomLootItem(bossId, sessionId);
    console.log(`newLoot: `, newLoot);
    if (!newLoot || newLoot.__typename === "DdbError") {
      console.warn("Something went wrong fetching new loot.");
    } else {
      console.log("newLootRef updating...");
      setWinCounter((c) => ++c);
    }
  };

  console.log(`winCounter`, winCounter);

  useEffect(() => {
    async function setupSession(sessionId: string | null) {
      if (!sessionId) {
        const session = await createSession();
        if (!session) {
          console.warn("Could not create a session! May see repeat questions.");
          return;
        }
        console.log("created session: ", session);
        setSessionId(session.id);
      } else {
        const session = await getSession(sessionId);
        if (!session) {
          console.warn(
            "Could not fetch session! This means no inventory and may see repeat questions."
          );
          return;
        }
        const parsedInventory = JSON.parse(session.inventory) as Inventory;

        console.log("updating session inventory...");
        session.inventory && setInventory(parsedInventory);
      }
    }

    setupSession(sessionId);
  }, [winCounter]);

  return (
    <>
      <Component sessionId={sessionId} lootBoss={lootBoss} {...pageProps} />
      <details>
        <summary>Your Inventory</summary>
        {Object.keys(inventory).length > 0 ? (
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2em",
              listStyle: "none",
            }}
          >
            {Object.keys(inventory).map((id) => {
              return (
                <li
                  key={id}
                  style={{ border: "1px solid black", borderRadius: "8px" }}
                >
                  <img
                    style={{ float: "left" }}
                    src={lootTable[id].thumbnailUrl}
                    alt={`image of ${lootTable[id].name}`}
                  />
                  <p>{`x${inventory[id]} ${lootTable[id].name}`}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Beat some bosses to loot some gear!</p>
        )}
      </details>
    </>
  );
}

export default MyApp;
