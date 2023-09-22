import {
  Box,
  Heading,
  Select,
  Spinner,
  Button,
  Image,
  Stack,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import kinds from "./kind.json";
import { Footer } from "./components";
import { MdAutorenew } from "react-icons/md";

async function fetchImage(mode: string): Promise<string> {
  const response = await fetch("https://nekobot.xyz/api/image?type=" + mode);
  const data = await response.json();
  return data.message;
}

const LoadingSpinner = () => {
  return <Spinner size="xl" />;
};

const App = () => {
  const [img, setImg] = useState(<LoadingSpinner />);
  const [last, setLast] = useState<string>("neko");
  const [nowLoading, setNowLoading] = useState<boolean>(false);
  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    setNowLoading(true);
    setImg(<LoadingSpinner />);
    const rurl = await fetchImage(mode);
    setLast(mode);
    setImg(<Image src={rurl} alt={last} />);
    setNowLoading(false);
  };
  const fetchAgain = async () => {
    setNowLoading(true);
    setImg(<LoadingSpinner />);
    const rurl = await fetchImage(last);
    setImg(<Image src={rurl} alt={last} />);
    setNowLoading(false);
  };
  useEffect(() => {
    (async () => {
      setNowLoading(true);
      const rurl = await fetchImage(last);
      setImg(<Image src={rurl} alt={last} />);
      setNowLoading(false);
    })();
  }, [last, setImg, setNowLoading]);
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box w="100%" maxW="xl" mx="auto" my="4" px={2}>
        <Heading
          textAlign="center"
          mb={{ base: "2", xl: "4" }}
          as="h2"
          size="2xl"
        >
          Nekobot Image Viewer
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={1}>
          <Select
            isDisabled={nowLoading}
            onChange={onChange}
            placeholder="タイプ選んで"
          >
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
            w={{ base: "full", md: "auto" }}
            marginX={{ base: "auto", md: 1 }}
          >
            <MdAutorenew />
          </Button>
        </Stack>
        <Center mt="4">{img}</Center>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
