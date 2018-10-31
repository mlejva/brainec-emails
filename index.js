window.onload = () => {
    let isSaving = false;
    let emailInput = document.getElementById('email-input');
    let saveEmailButton = document.getElementById('save-email-button');
    let db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    let infoTextDiv = document.getElementById('info-text');

    let gdprCheckbox = document.getElementById('gdpr-checkbox')


    saveEmailButton.onclick = () => {
        let email = emailInput.value;
        let isGdprChecked = gdprCheckbox.checked;

        if (email && !isSaving && isGdprChecked) {
            isSaving = true;
            saveEmailButton.hidden = true;
            infoTextDiv.textContent = 'Saving...';
            // Save to database
            db.collection('emails').add({ email })
            .then(() => {
                console.log('success');
                infoTextDiv.textContent = 'Saved 👍';
            })
            .catch((error) => {
                console.error(error);
                infoTextDiv.textContent = 'Something went wrong';
            })
            .finally(() => {
                emailInput.value = '';
                isSaving = false;
                gdprCheckbox.checked = false;
            });
        } else if (!isGdprChecked) {
            infoTextDiv.textContent = 'Please check the checkbox below';
        }
    };
};
