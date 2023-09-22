import {
  chakra,
  Box,
  Heading,
  Select,
  Spinner,
  Button,
  Image,
  Stack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { VscGithubAlt, VscTwitter, VscGlobe } from "react-icons/vsc";
import kinds from "./kind.json";

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
      const rurl = await fetchImage("neko");
      setImg(<Image src={rurl} alt="neko" />);
      setNowLoading(false);
    })();
  }, [setImg, setNowLoading]);
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box w="100%" maxW="xl" mx="auto" my="4" px={2}>
        <Heading textAlign="center" mb="2" as="h2" size="2xl">
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
            Reload
          </Button>
        </Stack>
        <Box mt="4">{img}</Box>
      </Box>
      <chakra.footer
        mt="auto"
        borderTop="1px"
        borderColor="gray.400"
        display="flex"
        h="20"
        w="full"
      >
        <Stack
          spacing="20px"
          direction={["column", "row"]}
          display="flex"
          mx="auto"
          alignItems="center"
        >
          <chakra.a
            display="flex"
            px="auto"
            href="https://github.com/tuna2134/neko-api-viewer"
          >
            <VscGithubAlt size={35} />
          </chakra.a>
          <chakra.a
            display="flex"
            px="auto"
            href="https://twitter.com/fdc_tuna2134"
          >
            <VscTwitter size={35} />
          </chakra.a>
          <chakra.a display="flex" px="auto" href="https://tuna2134.jp">
            <VscGlobe size={35} />
          </chakra.a>
        </Stack>
      </chakra.footer>
    </Box>
  );
};

export default App;
