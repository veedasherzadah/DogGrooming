package com.mycompany.myapp.domain;



public class Booking {

  
    private String firstName;

    private String lastName;
    
    private String dogName;

    private String email;
    
    private String service;
    
    private String date;
    
    private String time;

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

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Booking [firstName=" + firstName + ", lastName=" + lastName + ", dogName=" + dogName + ", email="
				+ email + ", service=" + service + ", date=" + date + ", time=" + time + "]";
	}


  
}
