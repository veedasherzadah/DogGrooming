package com.mycompany.myapp.domain;



public class Booking {

  
    private String firstName;

    private String lastName;
    
    private String dogName;

    private String email;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDogName() {
		return dogName;
	}

	public void setDogName(String dogName) {
		this.dogName = dogName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Booking [firstName=" + firstName + ", lastName=" + lastName + ", dogName=" + dogName + ", email="
				+ email + "]";
	}



  
}
