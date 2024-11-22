Feature: Search functionality on Udacity catalog page

  Scenario: Search for a skill term
    Given I navigate to the product page
    When I search for the term "testing"
    When I should see search results for the term "testing"
    When I click on the "Skill" filter
    Then I add and verify the skill "Automation Testing"

 Scenario: Search for an invalid term
    Given I navigate to the product page
    When I search for the term "nonexistantterm"
    Then I should see the error message "No Results found"