import { ActionPanel, List, OpenInBrowserAction, showToast, ToastStyle } from "@raycast/api";
import { useEffect, useState } from "react";
import { searchPods } from "./lib/kubernetes/pod";

interface SearchProps {
  text?: string;
}

export function Search(props: SearchProps) {
  const searchResult: { name: string }[] = [];
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (props.text) {
        await onSearchTextChange(props.text);
      }
      setLoading(false);
    })();
  }, []);

  const onSearchTextChange = async (text: string) => {
    if (text.length === 0) {
      return;
    }
    setLoading(true);
    try {
      searchPods("default");
    } catch (err) {
      showToast(ToastStyle.Failure, "Search failed", (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <List isLoading={loading} onSearchTextChange={onSearchTextChange} throttle>
      {searchResult.map((item: { name: string }) => (
        <List.Item
          key={item.name}
          title={item.name}
          actions={
            <ActionPanel>
              <OpenInBrowserAction url={item.name ? item.name : ""} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
