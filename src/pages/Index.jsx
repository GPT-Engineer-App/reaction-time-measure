import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { FaStopwatch } from "react-icons/fa";

const Index = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (waiting) {
      const timer = setTimeout(
        () => {
          setStartTime(Date.now());
          setWaiting(false);
          toast({
            title: "Click now!",
            description: "Click the button as fast as you can!",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        },
        Math.floor(Math.random() * 5000) + 2000,
      ); // Wait between 2-7 seconds randomly

      return () => clearTimeout(timer);
    }
  }, [waiting, toast]);

  const handleButtonClick = () => {
    if (waiting) {
      // If clicked too early
      toast({
        title: "Too soon!",
        description: "Wait for the go signal before clicking.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setWaiting(false);
    } else if (startTime) {
      setEndTime(Date.now());
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setStartTime(null);
    } else {
      setWaiting(true);
      setReactionTime(null);
      setEndTime(null);
    }
  };

  return (
    <VStack spacing={8} p={5}>
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          Reaction Time Tester
        </Text>
        <Text fontSize="md">Test how fast you can react to the go signal.</Text>
      </Box>
      <Button size="lg" leftIcon={<FaStopwatch />} colorScheme={waiting ? "red" : "teal"} onClick={handleButtonClick}>
        {waiting ? "Wait for it..." : startTime ? "Click now!" : "Start"}
      </Button>
      {reactionTime !== null && (
        <Text fontSize="lg">
          Your reaction time: <strong>{reactionTime} ms</strong>
        </Text>
      )}
    </VStack>
  );
};

export default Index;
