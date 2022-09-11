import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function data(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    
    const message = { 
        loading: 'img/form/spinner.svg',
        success: 'Спасибо за оставленную заявку, мы с вами обязательно свяжемся!',
        failure: 'Powel Nahui'
    };

    forms.forEach(item => { 
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); 
            statusMessage.src = message.loading; 
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            
            const formData = new FormData(form); 
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) { 
        const prevModalDialog = document.querySelector('.modal__dialog'); 

        prevModalDialog.classList.add('hide'); 
        openModal('.modal', modalTimerId);

        const thxModalDialog = document.createElement('div'); 
        thxModalDialog.classList.add('modal__dialog');
        thxModalDialog.innerHTML = `
            <div class='modal__content'>
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thxModalDialog);
        setTimeout (() => {
            thxModalDialog.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
    
}

export default data;