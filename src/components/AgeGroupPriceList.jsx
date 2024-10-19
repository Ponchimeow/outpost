import { Text, Box, Flex, Button, Divider, Spacer } from '@chakra-ui/react';
import AgeGroupSelect from './AgeGroupSelect';
import PriceInput from './PriceInput';
import { useState } from 'react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { getNumberIntervals, compareDuplicateArrays } from '../util';
import styled from 'styled-components';

const StyledLabelWrapper = styled(Flex)`
    margin: 1rem 0;
    font-weight: 700;
    font-size: 20px;
`

const AgeGroupPriceList = ({ result, onChange }) => {
    const [groups, setGroups] = useState(result);
    const [errorAgeGroup, setErrorAgeGroup] = useState([]);
    const [isCovered, setIsCovered] = useState(true);

    const validateGroupsChange = (groups) => {
        const intervals = groups.map(group => group.ageGroup);
        const { overlap, notInclude } = getNumberIntervals(intervals);
        setIsCovered(notInclude.length === 0);

        if (groups.length === 1 || overlap.length <= 0) {
            setErrorAgeGroup([])
        } else {
            setErrorAgeGroup(compareDuplicateArrays(groups, overlap));
        }
    }

    const handleGroupChange = (index, newGroup) => {
        const newGroups = [...groups];
        newGroups[index] = newGroup;
        setGroups(newGroups);
        onChange(newGroups);
        validateGroupsChange(newGroups);
    }


    const handleAddGroup = () => {
        setGroups([...groups, { ageGroup: [0, 20], price: "0" }]);
        validateGroupsChange([...groups, { ageGroup: [0, 20], price: "0" }])
    }

    return (
        <Box m="2rem">
            {groups.map((group, index) => (
                <Box key="index">
                    <StyledLabelWrapper>
                        <Text>價格設定-{index + 1}</Text>
                        <Spacer />
                        {groups.length > 1 && <Flex cursor='pointer' alignItems="center" color="red" onClick={() => {
                            const newGroups = [...groups.filter((v, i) => i !== index)]
                            setGroups(newGroups)
                            validateGroupsChange(newGroups)
                        }
                        }>
                            <CloseIcon mr="2" />
                            <Text >移除</Text>
                        </Flex>}
                    </StyledLabelWrapper>
                    <Flex>
                        <AgeGroupSelect
                            ageGroup={group.ageGroup}
                            onChange={(newAgeGroup) => handleGroupChange(index, { ...group, ageGroup: newAgeGroup })}
                            isOverLap={errorAgeGroup.includes(index)}
                        />
                        <Box w='20px' />
                        <PriceInput
                            price={group.price}
                            onChange={(newPrice) => handleGroupChange(index, { ...group, price: newPrice })}
                            currency="TWD"
                        />
                    </Flex>

                    {groups.length >= 2 && index !== groups.length - 1 ? <Divider my="2rem" /> : null}
                </Box>
            ))}
            <Button disabled={isCovered} px="0" mt="1rem" variant='ghost' color="#419f7eea" onClick={() => { handleAddGroup() }}>
                <AddIcon mr="2" />
                <Text>新增價格設定</Text>
            </Button>
        </Box>
    )
};

export default AgeGroupPriceList;