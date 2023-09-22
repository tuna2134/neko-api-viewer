import { chakra, HStack } from "@chakra-ui/react";
import { VscGithubAlt, VscTwitter, VscGlobe } from "react-icons/vsc";

export const Footer = () => {
  return (
    <chakra.footer
      mt="auto"
      borderTop="1px"
      borderColor="gray.400"
      display="flex"
      h="20"
      w="full"
    >
      <HStack spacing="20px" display="flex" mx="auto" alignItems="center">
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
      </HStack>
    </chakra.footer>
  );
};
