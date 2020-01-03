package com.fcore.contract.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ContractMapperTest {

    private ContractMapper contractMapper;

    @BeforeEach
    public void setUp() {
        contractMapper = new ContractMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(contractMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(contractMapper.fromId(null)).isNull();
    }
}
