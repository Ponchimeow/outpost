import React, { useState } from 'react';
import { Box, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { styled } from 'styled-components'
import { addComma } from '../util.js'

const StyledErrorWrapper = styled(Box)`
    color: red;
    background-color: #fdecea;
    padding: 0.3rem;
`



const PriceInput = ({ label, subLabel, currency }) => {
    const [price, setPrice] = useState('0');

    return (
        <Box w="300px">
            <Box color="grey" mb="0.5rem">{label}{subLabel ? `(${subLabel})` : null}</Box>
            <InputGroup borderRadius="1rem">
                <InputLeftAddon>{currency}</InputLeftAddon>
                <Input
                    type='string'
                    placeholder='請輸入費用'
                    borderColor={price === '' ? 'red' : ''}
                    value={price}
                    onChange={(e) => setPrice(addComma((e.target.value)))}
                />
            </InputGroup>
            {price === '' ? <StyledErrorWrapper>不可以為空白</StyledErrorWrapper> : null}
            <Box textAlign='right' color="grey">輸入0表示免費</Box>
        </Box>
    );
}

export default PriceInput;