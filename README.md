<h1>Playwright Test Automation - Parabank</h1>

Part 1 of the first obligatory assignment in <a href="https://student.oslomet.no/en/studier/-/studieinfo/emne/ADTS2310/2024/H%C3%98ST">ADTS2310 Software Testing</a> at Oslo Metropolitan University. The project runs multiple playwright tests in TypeScript towards the Parabank/Parasoft testing environment https://parabank.parasoft.com to allow basic understanding of playwright tests.
<br /><br />
<h2>Assignment answers:</h2>

<h3>1.1: Test automation in Playwright – task 1</h3>
“Test automation is a way of scripting your tests in order for you to focus on higher value tasks such as exploratory tests while automating time-consuming and mundane tests such as regression. Test automation allows us to perform more tests in a faster and comprehensive way, allowing greater consistency and objective assessment while increasing test coverage compared to manual testing. The thesis is designed by Iteria and is based on the guest lecture held on March 12, as well as the exercises the same week.”
<br /><br />
1.3: Write a manual step-by-step testcase for the “use customer care page”-scenario.<br />
1. Ensure you’re on the correct home page<br />
2. Locate the button linking to the customer care page, click it<br />
3. Ensure you’re on the customer care page<br />
4. Locate all four input fields and fill them with information<br />
5. Locate the submit-button, click it<br />
6. Ensure that your message is sent by checking the response text<br />
<br /><br />
1.5: Now we are going to create our first automated test by automating the test case we created in 1.3. Create a new file for Playwright, here we will put our first test
<br /><br />

<h3>1.2: Test automation in Playwright – task 2</h3>
2.1: What other benefits do we get by ensuring that our automated tests are independent of each other?
By ensuring that all tests can run independent of each other, not only can they run parallel to each other (making them run faster) but we also assure trust in the tests by making sure that every single step in the process can be completed independently of each other. In addition, the second or third test will still run if the first test fails – allowing us to make sure one part of the system won’t ruin all our tests – this also allows easier debugging, as we can manually run one test without having to test the entire system. The tests will also be easier to read by others who didn’t write the tests and allows them to be reused easier.
<br/><br/>
2.2: Manually write three test cases for parabank.parasoft.com/parabank/index.htm
Common for all tests:
First step: Login to the app
•	Navigate to home page.
•	Enter username and password.
•	Click “Login”.
•	Assert text “Account Services”.
Last step: Logout of the app
•	Click “Logout”.
•	Assert text “Customer Login”.
<br/><br/>
Test case 1: Update contact info<br/>
1. Navigate to Contact Info Update Page<br/>
•	Click on "Update Contact Info" in the menu.<br/>
•	Assert the page contains the text “Update Profile”.<br/>
2. Attempt to submit with empty input fields (negative test case)<br/>
•	Modify fields to be empty<br/>
•	Click the “Save button”.<br/>
•	Assert that an error message appears (e.g., “Zip Code is required.”).<br/>
3. Update Contact Information with valid details<br/>
•	Modify fields such as phone number, email, or address.<br/>
•	Click the "Save" button.<br/>
•	Assert the confirmation message appears (e.g., “Profile updated successfully”).<br/>
4. Reopen the Contact Info Page to Verify Changes Persist<br/>
•	Click on "Update Contact Info" again.<br/>
•	Assert that the modified details are displayed correctly.<br/>
<br/><br/>
Test case 2: Request loan<br/>
1. Navigate to Loan Request Page<br/>
•	Click on "Request Loan".<br/>
•	Assert the page contains the text “Apply for a Loan”.<br/>
2. Attempt to request a loan without entering required details (negative test case)<br/>
•	Click on the "Submit" button without filling out the loan form.<br/>
•	Assert an error message appears (e.g., “An internal error has occurred and has been logged.”).<br/>
3. Request a loan with invalid details (denied case)<br/>
•	Enter details that will lead to a loan denial (e.g., excessive loan amount).<br/>
•	Click the "Submit" button.<br/>
•	Assert that an error message appears (e.g., “We cannot grant a loan in that amount with your available funds.”).<br/>
4. Request a loan with valid details (approved case)<br/>
•	Enter valid loan details.<br/>
•	Click the "Submit" button.<br/>
•	Assert a success message appears (e.g., “Congratulations, your loan has been approved.”).<br/>
5. Verify Loan has entered new account.<br/>
•	Press the account number on the verification page.<br/>
•	Assert that the amount entered in loan request is available in account.<br/>
<br/><br/>
Test case 3: Pay bill<br/>
1. Navigate to Bill Payment Page<br/>
•	Click on "Bill Pay".<br/>
•	Assert the page contains the text “Bill Payment Service”.<br/>
2. Attempt to pay a bill without entering required details (negative test case)<br/>
•	Click the "Submit" button without filling in any details.<br/>
•	Assert an error message appears (e.g., “Payee name is required.”).<br/>
3. Attempt to pay a bill with an invalid account number (negative test case)<br/>
•	Enter an incorrect account number.<br/>
•	Fill in other required details.<br/>
•	Click the "Submit" button.<br/>
•	Assert an error message appears (e.g., “Please enter a valid number.”).<br/>
4. Pay a bill with valid details (successful case)<br/>
•	Enter a valid account number and payment details.<br/>
•	Click the "Submit" button.<br/>
•	Assert a confirmation message appears (e.g., “Bill payment complete”).<br/>

<h3>Technology used</h3>
<ul>
  <li>Playwright</li>
  <li>TypeScript</li>
</ul>

<h3>Sources:</h3>
<li>Paruch, L., Semsøy, S., & Solli, G. H. (2025). Itera [PowerPoint slides]. Itera. https://www.cs.hioa.no/~evav/TestingOsloMet/Forelesninger/20250313-Itera.pdf </li>
<li>Parasoft. (n.d.). Parabank [Website]. Retrieved March 20, 2025 from https://parabank.parasoft.com</li>
