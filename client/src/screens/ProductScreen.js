import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addCartItem } from "../redux/actions/cartActions";
import { useEffect, useState } from "react";

function ProductScreen() {
  const [amount, setAmount] = useState(1);
  let { id } = useParams();

  const toast = useToast();
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id, cart]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };
  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({
      description: `Item has been added`,
      status: `success`,
      isClosable: true,
    });
  };

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing="4">
          <Spinner
            mt="20"
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
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              align={{ lg: "flex-start" }}
            >
              <Stack
                pr={{ base: "0", md: "12" }}
                spacing={{ base: "8", md: "4" }}
                flex="1.5"
                mb={{ base: "12", md: "none" }}
              >
                {product.productIsNew && (
                  <Badge
                    rounded="full"
                    w="40px"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge
                    rounded="full"
                    w="70px"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    Sold out
                  </Badge>
                )}
                <Heading fontSize="2xl" fontFamily="extrabold">
                  {product.name}
                </Heading>
                <Stack spacing="5">
                  <Box>
                    <Text fontSize="xl">£{product.price}</Text>
                    <Flex>
                      <HStack spacing="2px">
                        <StarIcon color="orange.500" />
                        <StarIcon
                          color={
                            product.rating >= 2 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 3 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 4 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 5 ? "orange.500" : "gray.200"
                          }
                        />
                      </HStack>
                      <Text fontSize="md" fontWeight="bold" ml="4px">
                        {product.numberOfReviews}
                        {product.numberOfReviews <= 1 ? " review" : "reviews"}
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight="bold">Quantity</Text>
                  <Flex
                    w="170px"
                    p="5px"
                    borderColor="gray.200"
                    alignItems="center"
                  >
                    <Button
                      isDisabled={amount <= 1}
                      onClick={() => {
                        changeAmount("minus");
                      }}
                    >
                      <MinusIcon />
                    </Button>
                    <Text mx="10px">{amount}</Text>
                    <Button
                      isDisabled={amount >= product.stock}
                      onClick={() => {
                        changeAmount("plus");
                      }}
                    >
                      <SmallAddIcon w="20px" h="25px" />
                    </Button>
                  </Flex>
                  <Button
                    isDisabled={product.stock === 0}
                    colorScheme="orange"
                    onClick={() => addItem()}
                  >
                    Add to cart
                  </Button>
                  <Stack width="270px">
                    <Flex alignItems="center">
                      <BiPackage size="20px" />
                      <Text fontSize="sm" ml="2">
                        Free shipping if order is above $1000
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiSupport size="20px" />
                      <Text fontSize="sm" ml="2">
                        We're here for you
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex
                direction="column"
                align="center"
                flex="1"
                _dark={{ bg: "gray.900" }}
              >
                <Image mb="30px" src={product.image} alt={product.name} />
              </Flex>
            </Stack>
            <Stack>
              <Text fontSize="xl" fontWeight="bold">
                Reviews
                <SimpleGrid
                  minChildWith="300px"
                  spacingx="30px"
                  spacingy="20px"
                >
                  {product.reviews.map((review) => (
                    <Box key={review._id}>
                      <Flex spacing="2px" alignItems="center">
                        <StarIcon color="orange.500" />
                        <StarIcon
                          color={review.rating >= 2 ? "orange.500" : "gray.200"}
                        />
                        <StarIcon
                          color={review.rating >= 4 ? "orange.500" : "gray.200"}
                        />
                        <StarIcon
                          color={review.rating >= 4 ? "orange.500" : "gray.200"}
                        />
                        <StarIcon
                          color={review.rating >= 5 ? "orange.500" : "gray.200"}
                        />
                        <Text ml="4px">
                          {review.title} && {review.title}
                        </Text>
                      </Flex>
                      <Box py="12px">{review.comment}</Box>
                      <Text>
                        by {review.name},{" "}
                        {new Date(review.createdAt).toDateString()}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Text>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
}

export default ProductScreen;
