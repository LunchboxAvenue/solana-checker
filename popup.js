const findButton = document.getElementById("findButton");
const jupiterResult = document.getElementById("jupiter-result");
const meteoraResult = document.getElementById("meteora-result");
const linkResult = document.getElementById("link-result");

async function openTokenCheckers() {
  const contractAddress = document.getElementById("contractAddress");

  if (contractAddress && contractAddress.value) {
    const urls = [
      {
        url: `https://jup.ag/id/tokens/${contractAddress.value}`,
        name: "jupiter",
      },
      {
        url: `https://gmgn.ai/sol/token/${contractAddress.value}`,
        name: "gmgn",
      },
      {
        url: `https://app.bubblemaps.io/sol/token/${contractAddress.value}`,
        name: "bubblemaps",
      },
      {
        url: `https://rugcheck.xyz/tokens/${contractAddress.value}`,
        name: "rugcheck",
      },
      {
        url: `https://trench.bot/bundles/${contractAddress.value}`,
        name: "trenchbot",
      },
    ];

    linkResult.innerHTML = generateLinkHtml(urls);

    await fetch(`https://api.jup.ag/tokens/v1/token/${contractAddress.value}`, {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        jupiterResult.innerHTML = generateJupHTML(data);
      });

    await fetch(
      `https://dlmm-api.meteora.ag/pair/all_with_pagination?include_pool_token_pairs=${contractAddress.value}-So11111111111111111111111111111111111111112`,
      {
        headers: { Accept: "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        meteoraResult.innerHTML = generateMeteoraHtml(data);
      });
  }
}

findButton.onclick = openTokenCheckers;
