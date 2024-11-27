@smoke
Feature: Search functionality on Udacity catalog page

  Background:
    Given I navigate to the catalog page

  @positive
  Scenario: Search for a skill term
    When I search for the term "testing"

  @negative
  Scenario: Search for an invalid term
    When I search for the term "nonexistantterm"
    
