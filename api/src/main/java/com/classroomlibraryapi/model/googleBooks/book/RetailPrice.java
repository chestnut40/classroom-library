package com.classroomlibraryapi.model.googleBooks.book;

public class RetailPrice {
  private double amount;
  private String currencyCode;

  public double isAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public String getCurrencyCode() {
    return currencyCode;
  }

  public void setCurrencyCode(String currencyCode) {
    this.currencyCode = currencyCode;
  }
}
