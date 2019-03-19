import React from 'react'

import AuctionContainer from 'components/AuctionContainer'
import AuctionHeader from 'components/AuctionHeader'
import AuctionPriceBar from 'containers/AuctionPriceBar'
import AuctionWalletSummary from 'containers/AuctionWalletSummary'
import ButtonCTA from 'components/ButtonCTA'
import AuctionAmountSummary from 'containers/AuctionAmountSummary'
import jsonInterface from 'components/WalletPanel/DxInteracts.json'
import { dxAPI, getCurrentAccount } from 'api'

export interface WalletPanelProps {
  activeProvider: string,
  expressMode: boolean,
  checkUserStateAndSell(): void,
}

const dxiSellEther = async () => {
  const { web3: { web3 } } = await dxAPI()

  const dxiAddress = '0x2D8BE6BF0baA74e0A907016679CaE9190e80dD0A'
  const dxi = await web3.eth.contract(jsonInterface.abi).at(dxiAddress)

  console.log('done123asdf(£*&R(USDOAUDS*(dasfadfasdfdasfsd')

  const [currentAccount] = await Promise.all([getCurrentAccount()])

  console.log(currentAccount)
  console.log(dxi)

    // const wethAddress = "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0";
  const gnoAddress = '0x67B5656d60a809915323Bf2C40A8bEF15A152e3e'

  dxi.sellEther.sendTransaction(gnoAddress, {
      from: currentAccount,
      gas: 4000000,
      value: 50000000000000000000},
        function (error: string, result: string) { // get callback from function which is your transaction key
          if (!error) {
              console.log(result)
            } else {
              console.log(error)
            }
        })

}

const WalletPanel: React.SFC<WalletPanelProps> = ({ activeProvider, checkUserStateAndSell, expressMode }) => (

    <AuctionContainer auctionDataScreen="details">
        <AuctionHeader backTo="/order">
            Confirm Deposit Details
        </AuctionHeader>
        <AuctionAmountSummary/>
        <AuctionPriceBar header="Price"/>
        <AuctionWalletSummary/>
        <p>
            When submitting your order, you will be asked to sign transactions
            with {activeProvider || 'your Wallet provider'}.
            Explanations will be provided with each transaction.
            Upon final confirmation, your deposit will be added on your behalf to the next auction.
            <br/>
            <br/>
            Every auction takes approx. 6 hours.
        </p>
        {!expressMode && <ButtonCTA onClick={checkUserStateAndSell}>
            Submit Deposit <i className="icon icon-walletOK"></i>
        </ButtonCTA>}
        {expressMode && <ButtonCTA onClick={dxiSellEther}>
            One Click Trade <i className="icon icon-walletOK"></i>
        </ButtonCTA>}
    </AuctionContainer>
)

export default WalletPanel
