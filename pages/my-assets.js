import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router'

import {nftaddress, nftmarketaddress} from '../comfig.js'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function MyAssets() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const router = useRouter()
    useEffect(() => {
      loadNFTs()
    }, [])
    async function loadNFTs() {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = provider.getSigner()

      console.log(provider)
  
      const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
      const data = await marketContract.fetchMyNFTs()
  
      const items = await Promise.all(data.map(async i => {
        const tokenURI = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenURI)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          tokenURI
        }
        return item
      }))
      setNfts(items)
      setLoadingState('loaded') 
    }
    if (loadingState === 'loaded' && !nfts.length) return (
      <h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>
      )
    return (
      <div className="flex justify-center">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              nfts.map((nft, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <img src={nft.image} className="rounded" />
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }