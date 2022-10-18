import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

const setCardType = (cardType) => {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    nubank: ["purple", "white"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[cardType][0])
  ccBgColor02.setAttribute("fill", colors[cardType][1])
  ccLogo.setAttribute("src", `cc-${cardType}.svg`)
}

setCardType("mastercard")

globalThis.setCardType = setCardType
