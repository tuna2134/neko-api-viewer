import { Box, Text, Select, Spinner, Button, useToast, Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

async function fetchImage(mode: string): Promise<string> {
  const response = await fetch("https://nekobot.xyz/api/image?type=" + mode);
  const data = await response.json();
  return data.message;
}

const App = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [last, setLast] = useState<string>("neko");
  const toast = useToast();
  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    const toastId = toast({
      title: "Loading...",
      description: "画像を取得中です...",
      status: "info",
      position: "bottom-right",
    });
    const rurl = await fetchImage(mode);
    setLast(mode);
    setUrl(rurl);
    toast.close(toastId);
  };
  const fetchAgain = async () => {
    toast({
      title: "Loading...",
      description: "画像を取得中です...",
    })
    const rurl = await fetchImage(last);
    setUrl(rurl);
  }
  useEffect(() => {
    (async () => {
      const rurl = await fetchImage("neko");
      setUrl(rurl);
    })();
  }, [setUrl]);
  const kinds = [
    {
      name: "Coffee",
      value: "coffee",
    },
    {
      name: "Food",
      value: "food",
    },
    {
      name: "4K",
      value: "4k",
    },
    {
      name: "Hentai",
      value: "hentai",
    }
  ]
  return (
    <>
      <Box w="100%" maxW="xl" mx="auto">
        <Text fontSize="4xl">Neko API Viewer</Text>
        <Box display="flex">
          <Select px="2" onChange={onChange} placeholder="タイプ選んで">
            <option value="neko" selected>Neko</option>
            {kinds.map((kind => (
              <option key={kind.value} value={kind.value}>{kind.name}</option>
            )))}
          </Select>
          <Button textColor="white" bgColor="blue.400" px="2" onClick={fetchAgain}>Reload</Button>
        </Box>
        <Box mt="4">
          {url == undefined ? <Spinner /> : <Image mx="auto" src={url} alt={last} loading="lazy" />}
        </Box>
      </Box>
    </>
  )
};

export default App;