// script.js

// --- SECTION 1: Navbar and Header Dynamic Functionality ---

// Mobile Navigation Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

const toggleMobileMenu = () => {
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
};

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
}

// Dynamic Company Data (now mutable with 'let')
// This object will store the current values from the input fields
let companyData = {
    name: "Global Solutions Inc.",
    address: "Unit 7, Tech Park, Koregaon Park, Pune, Maharashtra, 411001",
    mobile_no: "+91-9988776655",
    email: "contact@globalsolutions.com",
    website: "www.globalsolutions.com",
    gstin: "27ABCDE1234F5Z9", // Example GSTIN for India
};

// Get references to the new input fields for company data
const companyNameInput = document.getElementById('companyName');
const companyAddressInput = document.getElementById('companyAddress');
const companyMobileInput = document.getElementById('companyMobile');
const companyEmailInput = document.getElementById('companyEmail');
const companyWebsiteInput = document.getElementById('companyWebsite');
const companyGstinInput = document.getElementById('companyGstin'); // Single GSTIN input
const gstinPreviewSpan = document.getElementById('gstinPreview'); // Span to display GSTIN for clarity

/**
 * Populates the input fields in the header with the current companyData values.
 * This runs on initial load.
 */
const populateCompanyInputs = () => {
    if (companyNameInput) companyNameInput.value = companyData.name || '';
    if (companyAddressInput) companyAddressInput.value = companyData.address || '';
    if (companyMobileInput) companyMobileInput.value = companyData.mobile_no || '';
    if (companyEmailInput) companyEmailInput.value = companyData.email || '';
    if (companyWebsiteInput) companyWebsiteInput.value = companyData.website || '';
    if (companyGstinInput) companyGstinInput.value = companyData.gstin || '';
    if (gstinPreviewSpan) gstinPreviewSpan.textContent = companyData.gstin || 'N/A';
};

/**
 * Updates the companyData object and the GSTIN preview when an input field changes.
 * @param {Event} event - The input event object.
 */
const handleCompanyInputChange = (event) => {
    const { id, value } = event.target;
    companyData[id] = value; // Update the corresponding property in companyData

    // Special handling for GSTIN to update its display span
    if (id === 'companyGstin' && gstinPreviewSpan) {
        gstinPreviewSpan.textContent = value || 'N/A';
    }

    // You might want to update the invoice preview here later
    // updateInvoicePreview();
};

// Attach input event listeners to all company data fields
document.addEventListener('DOMContentLoaded', () => {
    populateCompanyInputs(); // Populate inputs on load

    companyNameInput?.addEventListener('input', handleCompanyInputChange);
    companyAddressInput?.addEventListener('input', handleCompanyInputChange);
    companyMobileInput?.addEventListener('input', handleCompanyInputChange);
    companyEmailInput?.addEventListener('input', handleCompanyInputChange);
    companyWebsiteInput?.addEventListener('input', handleCompanyInputChange);
    companyGstinInput?.addEventListener('input', handleCompanyInputChange);
});


// customers section

// 2.1 Get DOM Element References
// ----------------------------------------------------
const customerForm = document.getElementById('customer-form'); // Note: ID changed to customer-form
const customerNameInput = document.getElementById('name');
const customerMobileNoInput = document.getElementById('mob-no');
const customerEmailInput = document.getElementById('email');
const customerAddressInput = document.getElementById('address');
const customerGstinInput = document.getElementById('customer-gstin');
const invoiceNoInput = document.getElementById('invoice-no');
const invoiceDateInput = document.getElementById('date');
const placeOfSupplyInput = document.getElementById('place-of-supply');

// Error message elements (using exact IDs from your React JSX)
const nameErrorElement = document.getElementById('name-error');
const mobNoErrorElement = document.getElementById('mob-error');
const emailErrorElement = document.getElementById('email-error');
const addressErrorElement = document.getElementById('address-error');
const invoiceNoErrorElement = document.getElementById('invoice-error');
const dateErrorElement = document.getElementById('date-error');
const placeOfSupplyErrorElement = document.getElementById('place-error');

const cancelCustomerInfoBtn = document.getElementById('cancelCustomerInfoBtn');
const saveCustomerInfoBtn = document.getElementById('saveCustomerInfoBtn'); // Note: This will be triggered by form submit


// 2.2 Global State for Customer & Invoice Details
// ----------------------------------------------------
// This object will hold the current values from the form inputs.
let customerInvoiceDetails = {
    name: '',
    mobileNo: '',
    email: '',
    address: '',
    gstin: '',
    invoiceNo: '',
    date: '',
    placeOfSupply: '',
};


// 2.3 Helper Functions for Error Display
// ----------------------------------------------------
const displayError = (element, message) => {
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
};

const hideError = (element) => {
    if (element) {
        element.textContent = '';
        element.classList.add('hidden');
    }
};


// 2.4 Form Validation Logic
// ----------------------------------------------------
const validateCustomerForm = () => {
    let isValid = true;

    // Name validation
    if (!customerNameInput.value.trim()) {
        displayError(nameErrorElement, 'Name is required!');
        isValid = false;
    } else {
        hideError(nameErrorElement);
    }

    // Mobile Number validation (10 digits)
    if (!customerMobileNoInput.value.trim() || customerMobileNoInput.value.length !== 10 || !/^\d+$/.test(customerMobileNoInput.value)) {
        displayError(mobNoErrorElement, 'Mobile number must be 10 digits!');
        isValid = false;
    } else {
        hideError(mobNoErrorElement);
    }

    // Email validation
    if (!customerEmailInput.value.trim() || !/\S+@\S+\.\S+/.test(customerEmailInput.value)) {
        displayError(emailErrorElement, 'Valid email is required!');
        isValid = false;
    } else {
        hideError(emailErrorElement);
    }

    // Address validation
    if (!customerAddressInput.value.trim()) {
        displayError(addressErrorElement, 'Address is required!');
        isValid = false;
    } else {
        hideError(addressErrorElement);
    }

    // Invoice Number validation
    if (!invoiceNoInput.value.trim()) {
        displayError(invoiceNoErrorElement, 'Invoice number is required!');
        isValid = false;
    } else {
        hideError(invoiceNoErrorElement);
    }

    // Date validation
    if (!invoiceDateInput.value) {
        displayError(dateErrorElement, 'Date is required!');
        isValid = false;
    } else {
        hideError(dateErrorElement);
    }

    // Place of Supply validation
    if (!placeOfSupplyInput.value.trim()) {
        displayError(placeOfSupplyErrorElement, 'Place of Supply is required!');
        isValid = false;
    } else {
        hideError(placeOfSupplyErrorElement);
    }

    return isValid;
};


// 2.5 Initialize Form Fields and Update Global State
// ----------------------------------------------------
/**
 * Populates form fields with initial data and updates the global customerInvoiceDetails object.
 * @param {object} initialData - Optional object to pre-fill form fields.
 */
const initializeCustomerForm = (initialData = {}) => {
    // Determine the current date for default pre-fill
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10); // YYYY-MM-DD

    // Set initial values for the global state object
    customerInvoiceDetails = {
        name: initialData.name || '',
        mobileNo: initialData.mobileNo || '',
        email: initialData.email || '',
        address: initialData.address || '',
        gstin: initialData.gstin || '',
        invoiceNo: initialData.invoiceNo || 'INV-' + today.getFullYear() + '-' + (Math.floor(Math.random() * 9000) + 1000), // Generate a random invoice no.
        date: initialData.date || formattedDate,
        placeOfSupply: initialData.placeOfSupply || 'Pune, Maharashtra', // Default place of supply
    };

    // Set input element values from the state object
    if (customerNameInput) customerNameInput.value = customerInvoiceDetails.name;
    if (customerMobileNoInput) customerMobileNoInput.value = customerInvoiceDetails.mobileNo;
    if (customerEmailInput) customerEmailInput.value = customerInvoiceDetails.email;
    if (customerAddressInput) customerAddressInput.value = customerInvoiceDetails.address;
    if (customerGstinInput) customerGstinInput.value = customerInvoiceDetails.gstin;
    if (invoiceNoInput) invoiceNoInput.value = customerInvoiceDetails.invoiceNo;
    if (invoiceDateInput) invoiceDateInput.value = customerInvoiceDetails.date;
    if (placeOfSupplyInput) placeOfSupplyInput.value = customerInvoiceDetails.placeOfSupply;

    // Clear any previous error messages
    hideError(nameErrorElement);
    hideError(mobNoErrorElement);
    hideError(emailErrorElement);
    hideError(addressErrorElement);
    hideError(invoiceNoErrorElement);
    hideError(dateErrorElement);
    hideError(placeOfSupplyErrorElement);
};


// 2.6 Event Handlers
// ----------------------------------------------------
/**
 * Updates the customerInvoiceDetails object when any form input changes.
 * This effectively replaces React's onChange handlers for each state.
 * @param {Event} event - The input event object.
 */
const handleCustomerInputChange = (event) => {
    const { id, value } = event.target;
    // Map HTML IDs to properties in customerInvoiceDetails
    const propMap = {
        'name': 'name',
        'mob-no': 'mobileNo',
        'email': 'email',
        'address': 'address',
        'customer-gstin': 'gstin',
        'invoice-no': 'invoiceNo',
        'date': 'date',
        'place-of-supply': 'placeOfSupply',
    };
    const propName = propMap[id];
    if (propName) {
        customerInvoiceDetails[propName] = value;
    }
};

/**
 * Handles the form submission. Performs validation and, if successful,
 * logs the data and can trigger further actions (e.g., update invoice preview).
 * This replaces React's `handleSubmit` function.
 * @param {Event} event - The submit event object.
 */
const handleCustomerFormSubmit = (event) => {
    event.preventDefault(); // Prevent default browser form submission behavior

    if (validateCustomerForm()) {
        console.log("Customer & Invoice Info Saved:", customerInvoiceDetails);
        alert('Customer & Invoice Information Saved Successfully!');
        // In a full application, you might call a function here to render this data into the invoice preview.
        // E.g., updateInvoicePreview(customerInvoiceDetails);
    } else {
        console.log("Validation failed for Customer & Invoice Info Form.");
    }
};

/**
 * Handles the cancel button click. Resets the form fields to their initial state.
 * This replaces React's `handleCancel` function and `onClose` prop.
 */
const handleCustomerFormCancel = () => {
    initializeCustomerForm(); // Resets all form fields to default/initial values
    alert('Customer & Invoice Info Form Reset!');
};


// 2.7 Attach Event Listeners on DOMContentLoaded
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the form fields with default/initial data when the DOM is ready
    initializeCustomerForm();

    // Attach input event listeners to all relevant input fields
    customerNameInput?.addEventListener('input', handleCustomerInputChange);
    customerMobileNoInput?.addEventListener('input', handleCustomerInputChange);
    customerEmailInput?.addEventListener('input', handleCustomerInputChange);
    customerAddressInput?.addEventListener('input', handleCustomerInputChange);
    customerGstinInput?.addEventListener('input', handleCustomerInputChange);
    invoiceNoInput?.addEventListener('input', handleCustomerInputChange);
    invoiceDateInput?.addEventListener('input', handleCustomerInputChange);
    placeOfSupplyInput?.addEventListener('input', handleCustomerInputChange);

    // Attach submit event listener to the form itself
    customerForm?.addEventListener('submit', handleCustomerFormSubmit);

    // Attach click event listener to the cancel button
    cancelCustomerInfoBtn?.addEventListener('click', handleCustomerFormCancel);
});




// 3.1 Get DOM Element References
// ----------------------------------------------------
const invoiceItemsTbody = document.getElementById('invoice-items-tbody');
const addItemBtn = document.getElementById('add-item-btn');
const submitInvoiceItemsBtn = document.getElementById('submit-invoice-items-btn');
const grandTotalIncludingTaxElement = document.getElementById('grand-total-including-tax'); // This is for the first table's footer
const totalSaleGrandTotalElement = document.getElementById('total-sale-grand-total'); // This is for the first table's footer
const submissionStatusMessage = document.getElementById('submission-status-message');

// References for the "Summary and Amount" section
const summaryInvoiceValueElement = document.getElementById('invoice-value');
const summaryGrandTotalElement = document.getElementById('grand-total-summary');
const totalCgstElement = document.getElementById('total-cgst');
const totalSgstElement = document.getElementById('total-sgst');
const totalIgstElement = document.getElementById('total-igst');
const totalCgstRow = document.getElementById('total-cgst-row');
const totalSgstRow = document.getElementById('total-sgst-row');
const totalIgstRow = document.getElementById('total-igst-row');

// --- NEW: References for Bank Details section ---
const editBankDetailsBtn = document.getElementById('edit-bank-details-btn');

// Display elements
const bankAccountNameDisplay = document.getElementById('bank-account-name-display');
const bankNameDisplay = document.getElementById('bank-name-display');
const bankAccountNumberDisplay = document.getElementById('bank-account-number-display');
const ifscCodeDisplay = document.getElementById('ifsc-code-display');
const branchNameDisplay = document.getElementById('branch-name-display');

// Input elements
const bankAccountNameInput = document.getElementById('bank-account-name-input');
const bankNameInput = document.getElementById('bank-name-input');
const bankAccountNumberInput = document.getElementById('bank-account-number-input');
const ifscCodeInput = document.getElementById('ifsc-code-input');
const branchNameInput = document.getElementById('branch-name-input');


// 3.2 Global State for Invoice Items (Existing)
let invoiceItems = [];
let nextItemId = 1;

// --- NEW: Global State for Company Details (including bank details) ---
// This object will hold the editable company data
let company = {
    bankAccountName: "Your Company Bank A/C",
    bankName: "State Bank of India",
    bankAccountNumber: "123456789012345",
    ifscCode: "SBIN0001234",
    branchName: "Main Branch, City"
    // Add other company details here if you have them, e.g.,
    // name: "Your Company Pvt Ltd",
    // address: "123 Business Road, City, State, 123456",
    // gstin: "27ABCDE1234F1Z5",
};

let isEditingBankDetails = false; // State variable to track edit mode


// 3.3 Helper Function to Create a New Item Object (Existing)
const createNewItem = () => {
    return {
        id: nextItemId++,
        description: '',
        hsnSacCode: '',
        quantity: 0,
        unit: '',
        rate: 0,
        totalSale: 0,
        cgstRate: 0,
        sgstRate: 0,
        igstRate: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
        totalAmountIncludingTax: 0,
    };
};


// 3.4 Calculation Logic (Existing)
const recalculateItemTotals = (item) => {
    const qty = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.rate) || 0;

    item.totalSale = qty * rate;

    const cgst = parseFloat(item.cgstRate) || 0;
    const sgst = parseFloat(item.sgstRate) || 0;
    const igst = parseFloat(item.igstRate) || 0;

    item.cgstAmount = (item.totalSale * cgst) / 100;
    item.sgstAmount = (item.totalSale * sgst) / 100;
    item.igstAmount = (item.totalSale * igst) / 100;

    item.totalAmountIncludingTax = item.totalSale + item.cgstAmount + item.sgstAmount + item.igstAmount;

    return item;
};

const updateGrandTotals = () => {
    let grandTotalSale = 0;
    let grandTotalIncludingTax = 0;
    let totalCgstAccumulated = 0;
    let totalSgstAccumulated = 0;
    let totalIgstAccumulated = 0;

    invoiceItems.forEach(item => {
        grandTotalSale += item.totalSale;
        grandTotalIncludingTax += item.totalAmountIncludingTax;
        totalCgstAccumulated += item.cgstAmount;
        totalSgstAccumulated += item.sgstAmount;
        totalIgstAccumulated += item.igstAmount;
    });

    if (totalSaleGrandTotalElement) {
        totalSaleGrandTotalElement.textContent = grandTotalSale.toFixed(2);
    }
    if (grandTotalIncludingTaxElement) {
        grandTotalIncludingTaxElement.textContent = grandTotalIncludingTax.toFixed(2);
    }

    if (summaryInvoiceValueElement) {
        summaryInvoiceValueElement.textContent = grandTotalSale.toFixed(2);
    }
    if (summaryGrandTotalElement) {
        summaryGrandTotalElement.textContent = grandTotalIncludingTax.toFixed(2);
    }

    if (totalCgstElement) {
        totalCgstElement.textContent = totalCgstAccumulated.toFixed(2);
        if (totalCgstRow) totalCgstRow.classList.toggle('hidden', totalCgstAccumulated === 0);
    }
    if (totalSgstElement) {
        totalSgstElement.textContent = totalSgstAccumulated.toFixed(2);
        if (totalSgstRow) totalSgstRow.classList.toggle('hidden', totalSgstAccumulated === 0);
    }
    if (totalIgstElement) {
        totalIgstElement.textContent = totalIgstAccumulated.toFixed(2);
        if (totalIgstRow) totalIgstRow.classList.toggle('hidden', totalIgstAccumulated === 0);
    }
};


// 3.5 Rendering and Event Handling for Table Rows (Existing)
const renderInvoiceItems = () => {
    if (!invoiceItemsTbody) return;
    invoiceItemsTbody.innerHTML = '';
    invoiceItems.forEach((item, index) => {
        const row = invoiceItemsTbody.insertRow();
        row.dataset.itemId = item.id;
        row.classList.add('invoice-item-row');
        row.innerHTML = `
            <td class="border border-gray-300 p-2 text-gray-700">${index + 1}</td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="text" data-name="description" class="description w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.description}" required></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="text" data-name="hsnSacCode" class="hsn-code w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.hsnSacCode}"></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="number" data-name="quantity" class="qty w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.quantity}" required></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="text" data-name="unit" class="unit w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.unit}"></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="number" data-name="rate" class="rate w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.rate}" required></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="number" data-name="cgstRate" class="cgst-rate w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.cgstRate}"></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="number" data-name="sgstRate" class="sgst-rate w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.sgstRate}"></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="number" data-name="igstRate" class="igst-rate w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-300" value="${item.igstRate}"></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="number" data-name="totalSale" class="total-sale w-full p-1 bg-gray-100" value="${item.totalSale.toFixed(2)}" readOnly></td>
            <td class="border border-gray-300 p-2 text-gray-700"><input type="number" data-name="totalAmountIncludingTax" class="total-amount-with-tax w-full p-1 bg-gray-100" value="${item.totalAmountIncludingTax.toFixed(2)}" readOnly></td>
            <td class="border border-gray-300 p-2 text-gray-700">
                <button type="button" class="delete-row bg-red-500 text-white p-1 rounded hover:bg-red-600">
                    Delete
                </button>
            </td>
        `;
    });
    updateGrandTotals();
};

const handleInvoiceItemChange = (event) => {
    const input = event.target;
    if (input.tagName === 'INPUT' && input.closest('.invoice-item-row')) {
        const row = input.closest('.invoice-item-row');
        const itemId = parseInt(row.dataset.itemId);
        const name = input.dataset.name;
        let value = input.value;

        if (['quantity', 'rate', 'cgstRate', 'sgstRate', 'igstRate'].includes(name)) {
            value = parseFloat(value) || 0;
        }

        const itemIndex = invoiceItems.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            const updatedItem = { ...invoiceItems[itemIndex], [name]: value };
            
            if (['quantity', 'rate', 'cgstRate', 'sgstRate', 'igstRate'].includes(name)) {
                recalculateItemTotals(updatedItem);
            }

            invoiceItems[itemIndex] = updatedItem;

            row.querySelector('[data-name="totalSale"]').value = updatedItem.totalSale.toFixed(2);
            row.querySelector('[data-name="totalAmountIncludingTax"]').value = updatedItem.totalAmountIncludingTax.toFixed(2);

            updateGrandTotals();
        }
    }
};

const handleRemoveItem = (event) => {
    if (event.target.classList.contains('delete-row')) {
        const row = event.target.closest('.invoice-item-row');
        if (row) {
            const itemId = parseInt(row.dataset.itemId);
            invoiceItems = invoiceItems.filter(item => item.id !== itemId);
            renderInvoiceItems();
        }
    }
};

const handleAddItem = () => {
    invoiceItems.push(createNewItem());
    renderInvoiceItems();
};

const handleSubmitItems = () => {
    const isValid = invoiceItems.every(item =>
        item.description.trim() !== '' && item.quantity > 0 && item.rate > 0
    );

    if (!isValid && invoiceItems.length > 0) {
        alert('Please ensure all item descriptions, quantities, and rates are filled correctly for all rows.');
        return;
    }
    if (invoiceItems.length === 0) {
        alert('Please add at least one invoice item.');
        return;
    }

    console.log("Invoice Items Submitted:", invoiceItems);
    console.log("Final Grand Total:", grandTotalIncludingTaxElement?.textContent);

    if (submissionStatusMessage) {
        submissionStatusMessage.classList.remove('hidden');
        setTimeout(() => {
            submissionStatusMessage.classList.add('hidden');
        }, 3000);
    }
};

// --- NEW: Functions for Bank Details Editing ---

/**
 * Populates the display spans with current company bank details.
 */
const renderBankDetails = () => {
    if (bankAccountNameDisplay) bankAccountNameDisplay.textContent = company.bankAccountName || 'N/A';
    if (bankNameDisplay) bankNameDisplay.textContent = company.bankName || 'N/A';
    if (bankAccountNumberDisplay) bankAccountNumberDisplay.textContent = company.bankAccountNumber || 'N/A';
    if (ifscCodeDisplay) ifscCodeDisplay.textContent = company.ifscCode || 'N/A';
    if (branchNameDisplay) branchNameDisplay.textContent = company.branchName || 'N/A';
};

/**
 * Populates the input fields with current company bank details.
 */
const populateBankDetailsInputs = () => {
    if (bankAccountNameInput) bankAccountNameInput.value = company.bankAccountName || '';
    if (bankNameInput) bankNameInput.value = company.bankName || '';
    if (bankAccountNumberInput) bankAccountNumberInput.value = company.bankAccountNumber || '';
    if (ifscCodeInput) ifscCodeInput.value = company.ifscCode || '';
    if (branchNameInput) branchNameInput.value = company.branchName || '';
};

/**
 * Toggles the visibility between display spans and input fields for bank details.
 */
const toggleBankDetailsEditMode = () => {
    isEditingBankDetails = !isEditingBankDetails; // Toggle the state

    const elements = [
        { display: bankAccountNameDisplay, input: bankAccountNameInput },
        { display: bankNameDisplay, input: bankNameInput },
        { display: bankAccountNumberDisplay, input: bankAccountNumberInput },
        { display: ifscCodeDisplay, input: ifscCodeInput },
        { display: branchNameDisplay, input: branchNameInput }
    ];

    elements.forEach(pair => {
        if (pair.display && pair.input) {
            pair.display.classList.toggle('hidden', isEditingBankDetails); // Hide display span in edit mode
            pair.input.classList.toggle('hidden', !isEditingBankDetails); // Show input in edit mode
        }
    });

    if (editBankDetailsBtn) {
        editBankDetailsBtn.textContent = isEditingBankDetails ? 'Save' : 'Edit';
        editBankDetailsBtn.classList.toggle('bg-green-500', isEditingBankDetails); // Change button color to green for Save
        editBankDetailsBtn.classList.toggle('hover:bg-green-600', isEditingBankDetails);
        editBankDetailsBtn.classList.toggle('bg-blue-500', !isEditingBankDetails); // Revert to blue for Edit
        editBankDetailsBtn.classList.toggle('hover:bg-blue-600', !isEditingBankDetails);
    }

    if (isEditingBankDetails) {
        // If entering edit mode, populate inputs with current data
        populateBankDetailsInputs();
    } else {
        // If exiting edit mode (after saving), re-render display spans
        renderBankDetails();
    }
};

/**
 * Handles the click event for the Edit/Save bank details button.
 */
const handleBankDetailsEditSave = () => {
    if (isEditingBankDetails) {
        // We are in edit mode, so "Save" was clicked
        // Update the company object with values from inputs
        if (bankAccountNameInput) company.bankAccountName = bankAccountNameInput.value;
        if (bankNameInput) company.bankName = bankNameInput.value;
        if (bankAccountNumberInput) company.bankAccountNumber = bankAccountNumberInput.value;
        if (ifscCodeInput) company.ifscCode = ifscCodeInput.value;
        if (branchNameInput) company.branchName = branchNameInput.value;

        // Optionally, you might want to save this `company` object to localStorage
        // or send it to a server here.
        console.log("Bank Details Saved:", company);
    }
    // Toggle the mode (from edit to display, or display to edit)
    toggleBankDetailsEditMode();
};


// 3.6 Initial Setup and Event Listeners on DOMContentLoaded (Existing, but updated)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Add one initial item row when the page loads
    if (invoiceItems.length === 0) {
        handleAddItem();
    }

    // Attach event listeners using event delegation for efficiency
    invoiceItemsTbody?.addEventListener('input', handleInvoiceItemChange);
    invoiceItemsTbody?.addEventListener('click', handleRemoveItem);

    // Attach click listener for "Add Row" button
    addItemBtn?.addEventListener('click', handleAddItem);

    // Attach click listener for "Submit Items" button
    submitInvoiceItemsBtn?.addEventListener('click', handleSubmitItems);

    // Initial update of summary totals
    updateGrandTotals();

    // --- NEW: Bank Details Initialization and Event Listener ---
    renderBankDetails(); // Populate bank details display on load
    editBankDetailsBtn?.addEventListener('click', handleBankDetailsEditSave); // Attach listener to the Edit/Save button
});



document.getElementById('generateInvoiceBtn')?.addEventListener('click', () => {
  const invoiceData = {
    companyData,
    customerInvoiceDetails,
    invoiceItems,
    companyBank: company
  };

  localStorage.setItem('generatedInvoice', JSON.stringify(invoiceData));
  window.open('invoice.html', '_blank');
});
