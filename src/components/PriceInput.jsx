import React, { useState } from 'react';
import { Box, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { styled } from 'styled-components'
import { addComma } from '../util.js'

const StyledErrorWrapper = styled(Box)`
    color: red;
    background-color: #fdecea;
    padding: 0.3rem;
`



const PriceInput = ({ price, onChange, currency }) => {
    const [inputPrice, setInputPrice] = useState(price);

    return (
        <Box w="300px">
            <Box color="grey" mb="0.5rem">{label}{subLabel ? `(${subLabel})` : null}</Box>
            <InputGroup borderRadius="1rem">
                <InputLeftAddon>{currency}</InputLeftAddon>
                <Input
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
            <Box textAlign='right' color="grey">輸入0表示免費</Box>
            {inputPrice === '' ? <StyledErrorWrapper>不可以為空白</StyledErrorWrapper> : null}
        </Box>
    );
}

export default PriceInput;