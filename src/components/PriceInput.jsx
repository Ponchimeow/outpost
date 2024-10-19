import React, { useState } from 'react';
import { Box, Text, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { styled } from 'styled-components'
import { addComma } from '../util.js'

const StyledErrorWrapper = styled(Text)`
    color: red;
    background-color: #fdecea;
    padding: 0.3rem;
`



const PriceInput = ({ price, onChange, currency }) => {
    const [inputPrice, setInputPrice] = useState(price);

    return (
        <Box w="100%">
            <Text color="grey" mb="0.5rem">入住費用(每人每晚)</Text>
            <InputGroup borderRadius="1rem">
                <InputLeftAddon h="3rem">{currency}</InputLeftAddon>
                <Input
                    h="3rem"
                    type='string'
                    placeholder='請輸入費用'
                    borderColor={inputPrice === '' ? 'red' : ''}
                    value={inputPrice}
                    onChange={(e) => {
                        let price = e.target.value.replaceAll(",", "")
                        if (isNaN(price)) return
                        if ((/^0+$/).test(price)) {
                            price.replace(/^0+$/, '0$1')
                            setInputPrice(0)
                        } else {
                            price = price.replace(/\b(0+)/gi, '')
                            setInputPrice(addComma(price))
                            onChange(addComma(price))
                        }

                    }}
                />
            </InputGroup>
            {inputPrice === '' ? <StyledErrorWrapper>不可以為空白</StyledErrorWrapper> : null}
            <Text textAlign='right' color="grey">輸入0表示免費</Text>
        </Box>
    );
}

export default PriceInput;