import { watchContractEvent } from '@wagmi/core'
import { useState } from 'react'

import { contract } from '../lib/web3config'

export default function useChallengeWatch(
  playerAddressInit,
  setChallengeId,
  setPlayerChoice,
  setHostChoice,
  setStatus,
) {
  const [playerAddress] = useState(
    playerAddressInit
  );

  // useContractEvent({
  //   address: contract.address,
  //   abi: contract.abi,
  //   eventName: 'ChallengeOpened',
  //   listener(challengeId, player, status, playerChoice, hostChoice) {
  //     console.log(player);
  //     if (player == playerAddress) {
  //       setChallengeId(challengeId as number);
  //       setPlayerChoice(playerChoice as number);
  //       setHostChoice(hostChoice as number);
  //       setStatus(status as number);
  //     }
  //   },
  // });

  watchContractEvent(
    {
      address: contract.address,
      abi: contract.abi,
      eventName: 'ChallengeClosed',
    },
    (challengeId, player, status, playerChoice, hostChoice) => {
      if (player == playerAddress) {
        setChallengeId(challengeId)
        setPlayerChoice(playerChoice)
        setHostChoice(hostChoice)
        setStatus(status)
      }
    }
  );
}
