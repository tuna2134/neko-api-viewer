import { Box, Text, Select, Spinner, Button, useToast, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

async function fetchImage(mode: string): Promise<string> {
  const response = await fetch("https://nekobot.xyz/api/image?type=" + mode);
  const data = await response.json();
  return data.message;
  /*
  const blob = await res.blob();
  console.log("Fetched");
  // change blob to base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject("Error")
      }
    }
    reader.readAsDataURL(blob);
  })
  */
}

const App = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [last, setLast] = useState<string>("neko");
  const toast = useToast();
  const onChange = async (e) => {
    const mode = e.target.value;
    const toastId = toast({
      title: "Loading...",
      description: "画像を取得中です...",
      status: "info",
    });
    const rurl = await fetchImage(mode);
    setLast(mode);
    setUrl(rurl);
    toast.close(toastId);
  };
  const fetchAgain = async () => {
    const rurl = await fetchImage(last);
    setUrl(rurl);
  }
  useEffect(() => {
    fetchAgain();
  });
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
          <Button px="2" onClick={fetchAgain}>Reload</Button>
        </Box>
        <Box mt="4">
          {url == undefined ? <Spinner /> : <Image mx="auto" src={url} alt={last} loading="lazy" />}
        </Box>
      </Box>
    </>
  )
};

export default App;