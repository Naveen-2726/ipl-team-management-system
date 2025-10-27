package com.examly.springapp.dto;

import jakarta.validation.constraints.*;

public class PlayerDTO {
    @NotBlank(message = "Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Name must not contain special characters or numbers")
    private String name;

    @NotBlank(message = "Specialties are required")
    @Size(min = 1, max = 500)
    private String specialties;

    @NotNull(message = "Experience is required")
    @Min(value = 0, message = "Experience must be a non-negative number")
    private Integer experience;

    @NotBlank(message = "Preferred position is required")
    @Size(min = 1, max = 200)
    private String preferredPosition;

    @NotBlank(message = "Phone Number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone Number must be exactly 10 digits long")
    private String phoneNumber;

    // Constructors
    public PlayerDTO() {}

    public PlayerDTO(String name, String specialties, Integer experience, String preferredPosition, String phoneNumber) {
        this.name = name;
        this.specialties = specialties;
        this.experience = experience;
        this.preferredPosition = preferredPosition;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecialties() { return specialties; }
    public void setSpecialties(String specialties) { this.specialties = specialties; }

    public Integer getExperience() { return experience; }
    public void setExperience(Integer experience) { this.experience = experience; }

    public String getPreferredPosition() { return preferredPosition; }
    public void setPreferredPosition(String preferredPosition) { this.preferredPosition = preferredPosition; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
}