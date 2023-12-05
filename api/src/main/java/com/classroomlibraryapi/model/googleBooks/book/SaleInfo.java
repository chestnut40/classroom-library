package com.classroomlibraryapi.model.googleBooks.book;

import java.time.LocalDateTime;

public class SaleInfo {
  private String country;
  private String saleability;
  private LocalDateTime onSaleDate;
  private boolean isEbook;
  private ListPrice listPrice;
  private RetailPrice retailPrice;
  private String buyLink;

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getSaleability() {
    return saleability;
  }

  public void setSaleability(String saleability) {
    this.saleability = saleability;
  }

  public LocalDateTime getOnSaleDate() {
    return onSaleDate;
  }

  public void setOnSaleDate(LocalDateTime onSaleDate) {
    this.onSaleDate = onSaleDate;
  }

  public boolean isEbook() {
    return isEbook;
  }

  public void setEbook(boolean ebook) {
    isEbook = ebook;
  }

  public ListPrice getListPrice() {
    return listPrice;
  }

  public void setListPrice(ListPrice listPrice) {
    this.listPrice = listPrice;
  }

  public RetailPrice getRetailPrice() {
    return retailPrice;
  }

  public void setRetailPrice(RetailPrice retailPrice) {
    this.retailPrice = retailPrice;
  }

  public String getBuyLink() {
    return buyLink;
  }

  public void setBuyLink(String buyLink) {
    this.buyLink = buyLink;
  }
}
