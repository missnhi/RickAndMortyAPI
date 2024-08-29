import React from "react";
import styles from "./card.component.css";

import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
    Badge,
} from "@chakra-ui/react";

const CharacterCard = ({ results }) => {
    let display;

    if (results) {
        display = results.map((x) => {
            let { id, image, name, status, location } = x;

            return (
                <Card key={id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" mb={4}>
                    <CardBody>
                        <Image
                            src={image}
                            alt={name}
                            borderRadius="lg"
                            objectFit="cover"
                            boxSize="100%"
                        />
                        <Stack mt="6" spacing="3">
                            <Heading size="md">{name}</Heading>
                            <Text fontSize="sm">Last Location</Text>
                            <Text fontSize="lg" fontWeight="semibold">
                                {location.name}
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Badge
                            colorScheme={
                                status === "Dead"
                                    ? "red"
                                    : status === "Alive"
                                        ? "green"
                                        : "gray"
                            }
                        >
                            {status}
                        </Badge>
                    </CardFooter>
                </Card>
            );
        });
    } else {
        display = <Text>No Characters Found :/</Text>;
    }

    return <>{display}</>;
};

export default CharacterCard;
