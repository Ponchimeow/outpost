import React, { useState } from 'react';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import styled from 'styled-components'

const StyledErrorWrapper = styled(Text)`
    color: red;
    background-color: #fdecea;
    padding: 0.3rem;
`


const AgeGroupSelect = ({ ageGroup, onChange, isOverLap }) => {
    const [startAge, setStartAge] = useState(ageGroup[0]);
    const [endAge, setEndAge] = useState(ageGroup[1]);

    const rangeOptions = Array.from({ length: 21 }, (_, i) => i);

    return <Box w="100%">
        <Text color="grey" mb="0.5rem">年齡</Text>
        <Flex>
            <Select
                value={startAge}
                onChange={(e) => {
                    setStartAge(Number(e.target.value))
                    onChange([Number(e.target.value), endAge])
                }}
                borderRadius='0.25rem 0 0 0.25rem'
                borderColor={isOverLap ? 'red' : ''}
                h="3rem"
            >
                {rangeOptions.map((value) => (
                    <option key={value} value={value} disabled={value > endAge}>
                        {value}
                    </option>
                ))}
            </Select>

            <Flex w="70px" h="3rem" bg="#ede8e8" borderTop="solid 2px #c7c2c2a6" borderBottom="solid 2px #c7c2c2a6" alignItems="center" justifyContent="center">
                <Text color="grey">～</Text>
            </Flex>

            <Select
                value={endAge}
                onChange={(e) => {
                    setEndAge(Number(e.target.value))
                    onChange([startAge, Number(e.target.value)])
                }}
                borderRadius='0 0.25rem 0.25rem 0'
                borderColor={isOverLap ? 'red' : ''}
                h="3rem"
            >
                {rangeOptions.map((value) => (
                    <option key={value} value={value} disabled={value < startAge}>
                        {value}
                    </option>
                ))}
            </Select>
        </Flex>
        {isOverLap ? <StyledErrorWrapper>年齡區間不可重疊</StyledErrorWrapper> : null}
    </Box>
}

export default AgeGroupSelect;