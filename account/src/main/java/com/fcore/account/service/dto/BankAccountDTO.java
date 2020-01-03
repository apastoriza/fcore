package com.fcore.account.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.fcore.account.domain.BankAccount} entity.
 */
public class BankAccountDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 1)
    private String number;

    @NotNull
    private Boolean enabled;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BankAccountDTO bankAccountDTO = (BankAccountDTO) o;
        if (bankAccountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankAccountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankAccountDTO{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", enabled='" + isEnabled() + "'" +
            "}";
    }
}
