const toggleIcon = document.querySelector(".toggle-icon");
const sidebar = document.querySelector(".sidebar");

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function abbreviateNumber(value) {
    let newValue = value;
    if (value >= 1000) {
        const suffixes = ["", "K", "M", "B", "T"];
        const suffixNum = Math.floor(("" + value).length / 3);
        let shortValue = "";
        for (let precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat(
                (suffixNum !== 0
                        ? value / Math.pow(1000, suffixNum)
                        : value
                ).toPrecision(precision)
            );
            const dotLessShortValue = (shortValue + "").replace(
                /[^a-zA-Z 0-9]+/g,
                ""
            );
            if (dotLessShortValue.length <= 2) {
                break;
            }
        }
        if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
}

function toggleCloseSidebar() {
    if (sidebar)
        sidebar.classList.toggle("close");
}

let initSideBar = function () {
    const toggle = document.querySelector(".toggle");
    if (toggle) {
        toggle.addEventListener("click", function () {
            toggleCloseSidebar();
        });
    }

};

let buildChart = function () {
    const ctx = document.getElementById("myChart");

    const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Credit",
                data: labels.map(() => randomIntFromInterval(0, 5000000)),
                backgroundColor: "#243D94",
                borderWidth: 0,
                borderColor: "red",
                borderRadius: 20,
                minBarLength: 1,
                maxBarThickness: 8,
            },
            {
                label: "Debit",
                data: labels.map(() => randomIntFromInterval(0, 5000000)),
                backgroundColor: "#179AA9",
                borderWidth: 0,
                borderRadius: 20,
                maxBarThickness: 8,
            },
        ],
    };

    if (window.Chart == undefined)
        return;
    new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                },
            },
            scales: {
                x: {
                    grid: {
                        color: "white",
                        borderColor: "white", // <-- this line is answer to initial question
                    },
                    ticks: {
                        color: "#243D94",
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#243D94",
                        font: {
                            size: 14, // 'size' now within object 'font {}'
                        },
                        callback: function (value) {
                            return abbreviateNumber(value);
                        },
                    },
                },
            },
        },
    });
};

window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
        sidebar.classList.remove("close");
    } else {
        sidebar.classList.add("close");
    }
});

(function () {
    initSideBar();
    if (window.innerWidth <= 992) {
        toggleCloseSidebar();
    }
    buildChart();


    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


    // find an element with  href value equal to last part of url after the slash and add active class to it
    const url = window.location.href;
    const activePage = url.substring(url.lastIndexOf('/') + 1);
    console.log(activePage);
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
            if (link.getAttribute('href') === activePage) {
                link.classList.add('active');
            }
        }
    );

    // select input name amount
    $("input[name='amount']").on('input', function () {
        let amount = $(this).val();
        // remove special characters except dot and comma
        amount = amount.replace(/[^0-9.,]/g, '');
        // remove all commas
        amount = amount.replace(/,/g, '');

        // add commas to the amount
        let amountWithCommas = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // add the amount with commas to the amount input
        $(this).val(amountWithCommas);
    });

})();

let currencies = [
    { abbr: "AED", name: "United Arab Emirates Dirham" },
    { abbr: "AUD", name: "Australian Dollar" },
    { abbr: "BTC", name: "Bitcoin" },
    { abbr: "EUR", name: "Euro" },
    { abbr: "GBP", name: "British Pound Sterling" },
    { abbr: "KES", name: "Kenyan Shilling" },
    { abbr: "RWF", name: "Rwandan Franc" },
    { abbr: "UGX", name: "Ugandan Shilling" },
    { abbr: "USD", name: "United States Dollar" }
];

window.currencies = currencies;

let companies = [
    "Airtel LTD",
    "Orion Systems & Design",
    "MSN Inc.",
    "Google",
    "Facebook Corp.",
];
window.companies = companies;