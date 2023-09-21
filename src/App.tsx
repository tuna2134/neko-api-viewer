import { Box, Text, Select, Spinner, Button, Image, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

async function fetchImage(mode: string): Promise<string> {
  const response = await fetch("https://nekobot.xyz/api/image?type=" + mode);
  const data = await response.json();
  return data.message;
}

const App = () => {
  const [img, setImg] = useState(<Spinner />);
  const [last, setLast] = useState<string>("neko");
  const [nowLoading, setNowLoading] = useState<boolean>(false);
  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    setNowLoading(true);
    setImg(<Spinner />);
    const rurl = await fetchImage(mode);
    setLast(mode);
    setImg(<Image src={rurl} alt={last} />);
    setNowLoading(false);
  };
  const fetchAgain = async () => {
    setNowLoading(true);
    setImg(<Spinner />);
    const rurl = await fetchImage(last);
    setImg(<Image src={rurl} alt={last} />);
    setNowLoading(false);
  };
  useEffect(() => {
    (async () => {
      setNowLoading(true);
      const rurl = await fetchImage("neko");
      setImg(<Image src={rurl} alt="neko" />);
      setNowLoading(false);
    })();
  }, [setImg, setNowLoading]);
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
    },
    {
      name: "パイズリ",
      value: "paizuri",
    },
    {
      name: "pgif",
      value: "pgif",
    },
  ];
  return (
    <>
      <Box w="100%" maxW="xl" mx="auto">
        <Text mt="6" fontSize="4xl">
          Nekobot API Viewer
        </Text>
        <Stack direction="row" spacing={1}>
          <Select onChange={onChange} placeholder="タイプ選んで">
            <option value="neko" selected>
              Neko
            </option>
            {kinds.map((kind) => (
              <option key={kind.value} value={kind.value}>
                {kind.name}
              </option>
            ))}
          </Select>
          <Button
            colorScheme="twitter"
            mx="2"
            onClick={fetchAgain}
            isDisabled={nowLoading}
          >
            Reload
          </Button>
        </Stack>
        <Box mt="4">{img}</Box>
      </Box>
    </>
  );
};

export default App;
