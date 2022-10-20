import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

const setCardType = (cardType) => {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    elo: ["#00A6E0", "#FFCB01"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[cardType][0])
  ccBgColor02.setAttribute("fill", colors[cardType][1])
  ccLogo.setAttribute("src", `cc-${cardType}.svg`)
}

setCardType("default")

globalThis.setCardType = setCardType

// #region Masks
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^8\d{0,15}/,
      cardType: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const maskSelected = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    )
    console.log(maskSelected)
    return maskSelected
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear() + 1).slice(2),
      to: 99,
    },
  },
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// #endregion Masks

function handleInputCardNumber(cardNumber) {
  const defaultCardNumber = "1234 5678 9012 3456"
  const ccCardNumber = document.querySelector(".cc-number")

  ccCardNumber.innerText =
    cardNumber.length > 0 ? cardNumber : defaultCardNumber
}

function handleInputName() {
  const defaultHolderName = "FULANO DA SILVA"
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length > 0 ? cardHolder.value : defaultHolderName
}

function handleInputExpirationDate(expirationDate) {
  const defaultExpirationDate = "02/32"
  const ccExpirationDate = document.querySelector(".cc-expiration .value")

  ccExpirationDate.innerText =
    expirationDate.length > 0 ? expirationDate : defaultExpirationDate
}

function handleInputSecurityCode(securityCode) {
  const defaultSecurityCode = "123"
  const ccSecurityCode = document.querySelector(".cc-security .value")

  ccSecurityCode.innerText =
    securityCode.length > 0 ? securityCode : defaultSecurityCode
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask?.cardType
  setCardType(cardType)
  handleInputCardNumber(cardNumberMasked.value)
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  handleInputName()
})

expirationDateMasked.on("accept", () => {
  handleInputExpirationDate(expirationDateMasked.value)
})

securityCodeMasked.on("accept", () => {
  handleInputSecurityCode(securityCodeMasked.value)
})

const addCardButton = document.querySelector("#add-card")
addCardButton.addEventListener("click", () => {
  alert("Cartão cadastrado com sucesso!")
})

// Prevent browser from reloading the page:
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})
