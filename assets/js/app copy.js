// Utility Functions
const showToast = (message) => {
	const toast = $(`<div class="toast-message">${message}</div>`);
	$('#toast-container').append(toast);
	toast.css({
		padding: '10px 20px',
		background: '#333',
		color: '#fff',
		borderRadius: '5px',
		marginBottom: '10px',
		opacity: 0,
		transition: 'opacity 0.5s',
	});
	setTimeout(() => toast.css('opacity', 1), 10);
	setTimeout(() => {
		toast.css('opacity', 0);
		setTimeout(() => toast.remove(), 500);
	}, 3000);
};

// Page Loading and Navigation
const loadPage = async (page) => {
	try {
		const response = await fetch(`/pages/${page}`);
		const content = await response.text();
		document.getElementById('main-content').innerHTML = content;
		attachEventListeners();
		if (page === 'donate') {
			renderPackages();
			updateSelectedPackage();
		}
	} catch (error) {
		document.getElementById('main-content').innerHTML = '<p>Failed to load page.</p>';
		console.error('Error loading page:', error);
	}
};

const setupPageLoader = () => {
	document.addEventListener('click', (event) => {
		const target = event.target.closest('[data-page]');
		if (!target) return;
		event.preventDefault();
		const page = target.getAttribute('data-page');
		if (!page) {
			console.error('Page attribute missing on element:', target);
			return;
		}
		loadPage(page);
		const pageId = page.split('.')[0];
		history.pushState({ page: pageId }, '', `#${pageId}`);
	});
};

const loadInitialPage = () => {
	const initialHash = window.location.hash.substring(1);
	const initialPage = initialHash || 'home';
	loadPage(initialPage);
	history.replaceState({ page: initialPage }, '', `#${initialPage}`);
};

// Event Listeners
const attachEventListeners = () => {
	const proceedDonation = document.getElementById('proceed-donation');
	const donationForm = document.getElementById('donationForm');

	if (proceedDonation) proceedDonation.addEventListener('click', () => alert('Proceeding with Donation!'));
	if (donationForm) {
		donationForm.addEventListener('submit', handleDonationSubmit);
	}
};

// Donation Submission Handler
const handleDonationSubmit = async (e) => {
	e.preventDefault();
	const uid = document.getElementById('uid').value.trim();
	const tid = document.getElementById('tid').value.trim();

	if (!uid || !tid) {
		alert('Please enter both User ID and Thread ID.');
		return;
	}

	try {
		document.querySelector('.loader').style.display = 'block';
		const userResponse = await axios.get(`/api/user/${uid}`);
		const threadResponse = await axios.get(`/api/thread/${tid}`);

		if (userResponse.data.status === 'success' && threadResponse.data.status === 'success') {
			const userData = userResponse.data.data;
			const threadData = threadResponse.data.data;
			renderUserThreadInfo(userData, threadData);
		} else {
			throw new Error('User or Thread not found');
		}
	} catch (error) {
		alert('An error occurred while fetching data. Please check your User ID and Thread ID.');
		console.error('Error:', error);
	} finally {
		document.querySelector('.loader').style.display = 'none';
	}
};

const renderUserThreadInfo = (userData, threadData) => {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
		return;
	}

	packageContainer.innerHTML = `
        <div class="col-12">
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">User Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${userData.avatar}" class="rounded-circle mb-3" alt="${userData.name}" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">${userData.name}</h5>
                            <p class="card-text">Username: ${userData.vanity}</p>
                            <p class="card-text">User ID: ${userData.userID}</p>
                            <p class="card-text">Exp: ${userData.exp}</p>
                            <p class="card-text">Money: ${userData.money}</p>
                            <p class="card-text">Last Active GC: ${userData.settings.last_active_gc}</p>
                            <p class="card-text">Token Time: ${new Date(userData.settings.token_time).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-header bg-success text-white">Thread Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${threadData.imageSrc}" class="rounded-circle mb-3" alt="${threadData.threadName}" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">${threadData.threadName}</h5>
                            <p class="card-text">Thread ID: ${threadData.threadID}</p>
                            <p class="card-text">Approval Mode: ${threadData.approvalMode ? 'Enabled' : 'Disabled'}</p>
                            <p class="card-text">Admins: ${threadData.adminIDs.length}</p>
                            <p class="card-text">Members: ${threadData.members.length}</p>
                            <p class="card-text">Updated At: ${new Date(threadData.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button id="confirmProceed" class="btn btn-success btn-lg">Confirm and Proceed</button>
            </div>
        </div>
    `;

	const confirmProceedButton = document.getElementById('confirmProceed');
	if (confirmProceedButton) {
		confirmProceedButton.addEventListener('click', () => {
			// $(document).ready(function () {
			// 	$('#donationForm').submit(function (e) {
			// e.preventDefault();

			$.ajax({
				url: '/bkash/create-payment',
				method: 'POST',
				data: {
					amount: $('#selectedPackagePrice').text(),
					uid: $('#uid').val(),
					tid: $('#tid').val()
				},
				success: function (response) {
					if (response.bkashURL) {
						// Open the bKash payment page in a popup
						const paymentPopup = window.open(response.bkashURL, 'bKash Payment', 'width=500,height=600');

						// Listen for messages from the popup window
						window.addEventListener('message', function (event) {
							if (event.origin === window.location.origin) {
								const paymentStatus = event.data;
								handlePaymentResponse(paymentStatus);
								if (paymentPopup) paymentPopup.close(); // Close popup after receiving the response
							}
						}, false);
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong while creating the payment!'
						});
					}
				},
				error: function () {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Failed to initiate payment. Please try again.'
					});
				}
			});
			// 	});
			// });

			// Function to handle payment response
			function handlePaymentResponse(paymentStatus) {
				if (paymentStatus.status === 'success') {
					Swal.fire({
						icon: 'success',
						title: 'Thank you',
						text: 'Your payment has been processed successfully! Transaction ID:' + paymentStatus.trxID
					});
				} else if (paymentStatus.status === 'cancel') {
					Swal.fire({
						icon: 'info',
						title: 'Payment Cancelled',
						text: 'Payment was cancelled by the user.'
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Payment Failed',
						text: 'Something went wrong during the payment process.'
					});
				}
			}

			alert('Proceeding with donation. Implement your donation logic here.');
		});
	}
};

// Donation Packages
const packages = [
	{
		tier: 1,
		name: "Chika's Cheerful Support",
		price: 50,
		icon: '🌟',
		description: "Support Chika's adventures with a cheerful donation!",
		benefits: [
			'A special thank-you message from Chika.',
			'Your name featured in a supporter list.',
			'No feature unlocks, but your support is greatly appreciated!',
		],
	},
	{
		tier: 2,
		name: "Chika's Secret Plan",
		price: 100,
		icon: '🎯',
		description: "Unlock Chika's secret plan and enjoy exclusive perks!",
		benefits: [
			'Activate a single group chat (GC) with the bot for 1 month.',
			'Priority access to bot updates and announcements.',
			"Special badge in the bot's friend list indicating your support level.",
		],
	},
	{
		tier: 3,
		name: "Chika's Supreme Strategy",
		price: 200,
		icon: '🎯',
		description: "Boost Chika's supreme strategy and double the fun!",
		benefits: [
			'Activate a group chat with the bot for 2 months.',
			'Priority access to new features as they roll out.',
			"Special supporter badge in the bot's friend list.",
			'Personalized thank-you video message from Chika.',
		],
	},
	{
		tier: 4,
		name: "VIP: Chika's Elite Fan",
		price: 500,
		icon: '👑',
		description: "Enjoy exclusive access reserved for Chika's most dedicated fans.",
		benefits: [
			'Activate a group chat with the bot for 6 months.',
			'VIP status: Access to private chats with the bot.',
			'Live support and priority responses to queries.',
			'Ability to submit feature requests and influence bot updates.',
			'2x EXP boost and faster level-ups (2x speed).',
			'Use the bot in any group or place, even if not currently active.',
			'Special recognition in bot communications as a VIP supporter.',
		],
	},
	{
		tier: 5,
		name: "Legendary: Chika's Ultimate Patron",
		price: 1000,
		icon: '🏆',
		description: "Join Chika's inner circle as a true hero of the waifu world!",
		benefits: [
			'All benefits from the VIP Three Star package.',
			'3x EXP boost and even faster level-ups (3x speed).',
			'Exclusive "Legendary Patron" badge in the bot\'s friend list.',
			'Access to a private friends list feature with Chika.',
			'Direct influence on bot features and priority in feature rollouts.',
			'Personalized video shoutout from Chika, tailored to you.',
			'Extra perks such as early access to new bot capabilities, special event invites, and more customizable bot interactions.',
			'Option to have Chika bot join and assist in your group events as a guest.',
		],
	},
];

let selectedPackage = packages[0];

const renderPackages = () => {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
		return;
	}
	packageContainer.innerHTML = packages
		.map(
			(pkg) => `
        <div class="col">
            <div class="card h-100 glass-card" data-tier="${pkg.tier}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="badge bg-secondary">Tier ${pkg.tier}</span>
                        <span class="package-icon">${pkg.icon}</span>
                    </div>
                    <h5 class="card-title">${pkg.name}</h5>
                    <h6 class="card-subtitle mb-2 text-warning">৳${pkg.price}</h6>
                    <p class="card-text">${pkg.description}</p>
                    <ul class="list-unstyled">
                        ${pkg.benefits
					.map(
						(benefit) => `
                            <li class="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                                ${benefit}
                            </li>
                        `
					)
					.join('')}
                    </ul>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-light w-100 select-package">Select Package</button>
                </div>
            </div>
        </div>
    `
		)
		.join('');
};

const updateSelectedPackage = () => {
	const nameElement = document.getElementById('selectedPackageName');
	const priceElement = document.getElementById('selectedPackagePrice');
	if (!nameElement || !priceElement) {
		console.error('Selected package elements not found');
		return;
	}
	nameElement.textContent = selectedPackage.name;
	priceElement.textContent = selectedPackage.price;
	document.querySelectorAll('.card').forEach((card) => card.classList.remove('selected'));
	const selectedCard = document.querySelector(`.card[data-tier="${selectedPackage.tier}"]`);
	if (selectedCard) selectedCard.classList.add('selected');
};

// Main Execution
document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('.nav-link');
	const setActiveLink = () => {
		const currentHash = window.location.hash;
		navLinks.forEach((link) => {
			link.classList.toggle('is-active', link.getAttribute('href') === currentHash);
		});
	};

	window.addEventListener('hashchange', setActiveLink);
	setActiveLink();

	$('.nav-link').click(function () {
		$('.nav-link').removeClass('is-active');
		$(this).addClass('is-active');
	});

	const menuBars = $('.menu-bars');
	const leftSideMenu = $('.left-side');
	menuBars.click(function (e) {
		e.stopPropagation();
		$('body').toggleClass('menu-shown');
		leftSideMenu.toggleClass('shown');
	});

	$(document).click(function (e) {
		if (!$(e.target).closest('.left-side, .menu-bars').length) {
			$('body').removeClass('menu-shown');
			leftSideMenu.removeClass('shown');
		}
	});

	document.querySelector('.dark-light').addEventListener('click', () => {
		document.body.classList.toggle('light-mode');
	});

	window.addEventListener('popstate', (e) => {
		if (e.state && e.state.page) {
			loadPage(e.state.page);
		} else {
			loadPage('home');
		}
	});

	document.addEventListener('click', function (e) {
		if (e.target.classList.contains('select-package')) {
			const tier = parseInt(e.target.closest('.card').dataset.tier);
			selectedPackage = packages.find((pkg) => pkg.tier === tier);
			updateSelectedPackage();
		}
	});

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/assets/js/service-worker.js')
			.then((registration) => console.log('Service Worker registered:', registration))
			.catch((error) => console.error('Service Worker registration failed:', error));
	}

	const updateCacheButton = document.getElementById('update-cache');
	if (updateCacheButton) {
		updateCacheButton.addEventListener('click', async () => {
			console.log('Update Cache button clicked');
			if ('serviceWorker' in navigator) {
				try {
					const registration = await navigator.serviceWorker.ready;
					if (registration.active) {
						registration.active.postMessage({ action: 'updateCache' });
						showToast('Cache updated successfully!');
						setTimeout(() => location.reload(), 3000);
					} else {
						console.error('No active Service Worker found.');
					}
				} catch (error) {
					console.error('Failed to get Service Worker ready:', error);
				}
			} else {
				console.error('Service Worker not supported.');
			}
		});
	}

	setupPageLoader();
	loadInitialPage();
});