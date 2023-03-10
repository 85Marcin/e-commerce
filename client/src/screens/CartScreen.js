import {
  Box,
  Stack,
  Link,
  Flex,
  Heading,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Wrap,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { loading, error, cart } = cartInfo;

  const getHeadingContent = () =>
    cart.length === 1 ? `(1 item)` : `(${cart.length} items)`;
  const linkColor = useColorModeValue("orange.500", "orange.200"); // move the hook outside of the conditional statement
  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner
            mt="10"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : CartScreen.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to="/products">
              Click here to see our products
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: 8, md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex="2">
              <Heading fontsize="2xl" fontWeight="extrabold">
                Shopping Cart{getHeadingContent()}
              </Heading>
              <Stack spacing="6">{/* cart item */}</Stack>
            </Stack>
            <Flex direction="column" align="center" flex="1">
              {/* Cart Order Summary */}
              <HStack mt={6} fontWeight="semibold">
                <p>or</p>
                <Link as={ReactLink} to="/products" color={linkColor}>
                  Continue shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartScreen;
