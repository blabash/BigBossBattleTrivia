import type { AppProps /*, AppContext */ } from "next/app";
import { useEffect, useState } from "react";
import { lootTable } from "../amplify/backend/function/getRandomLootItem/src";
import useLocalStorage from "../hooks/useLocalStorage";
import { createSession, getSession } from "../lib/bosses";

type Inventory = [string, number][];

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionId, setSessionId] = useLocalStorage<string>("sessionId", null);
  const [inventory, setInventory] = useState<Inventory>([]);
  console.log("local storage session id: ", sessionId);
  console.log(`inventory: `, inventory);

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
          console.warn("Could not fetch session! May see repeat questions.");
          return;
        }
        console.log(`fetched session: `, session);
        const parsedInventory = JSON.parse(session.inventory);
        session.inventory && setInventory(Object.entries(parsedInventory));
      }
    }

    setupSession(sessionId);
  }, []);

  return (
    <>
      <Component sessionId={sessionId} {...pageProps} />
      <details>
        <summary>Your Inventory</summary>
        {inventory.length > 0 ? (
          <ul style={{ display: "flex", gap: "2em", listStyle: "none" }}>
            {inventory.map((item) => {
              return (
                <li
                  key={item[0]}
                  style={{ border: "1px solid black", borderRadius: "8px" }}
                >
                  <img
                    style={{ float: "left" }}
                    src={lootTable[item[0]].thumbnailUrl}
                    alt={`image of ${lootTable[item[0]].name}`}
                  />
                  <p>{`x${item[1]} ${lootTable[item[0]].name}`}</p>
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
