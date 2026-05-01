# Capstone Project: Decentralized Messaging Application

## Overview

This project aims to create a decentralized messaging application using blockchain technology, focusing on secure and private communication. The application uses blockchain wallets for identity verification through Public Key Infrastructure (PKI) and prioritizes the optimization of gas fees for scalability and efficiency.

### Project Title

**Decentralized Messaging Service**

### Team Members

- **Yitan Li**: Responsible for designing the decentralized messaging app and implementing blockchain and wallet-based authentication.
- **Bruce Chen**: Collaborating on blockchain integration and overall project architecture AND Assisting with system architecture and gas fee optimization strategies.

### Supervisor

**Professor Lihua Xu**, NYU Shanghai

## Project Motivation

The current messaging landscape faces challenges regarding user privacy and data control, as most platforms are centralized, allowing potential abuse of user data and third-party surveillance. This project aims to address these challenges by leveraging blockchain technology to build a messaging platform that offers privacy, data integrity, and decentralized control. The decentralized nature of the application ensures that only intended recipients have access to messages, enhancing privacy and user autonomy.

## Objectives

1. **Secure Messaging**: Develop a secure and decentralized communication platform leveraging blockchain wallets for identity verification.
2. **Gas Fee Optimization**: Research and implement methods for reducing the gas costs associated with using the Ethereum blockchain, based on the work by C. Li, _"Gas Estimation and Optimization for Smart Contracts on Ethereum"_.
3. **User-Friendly Experience**: Provide a straightforward user interface that integrates wallet authentication and blockchain messaging seamlessly.

## Architecture

The project architecture comprises:

- **Frontend**: A web-based user interface that allows users to interact with the decentralized messaging system. It uses React and Next.js frameworks for the front-end implementation.
- **Backend and Smart Contracts**: Smart contracts deployed on an Ethereum-compatible blockchain. Thirdweb SDK is used to simplify contract deployment and wallet connections.
- **Wallet-Based Authentication**: Using thirdweb for integration with popular wallets like MetaMask, ensuring secure, private, and convenient access.

## Features

- **Identity Verification**: Using blockchain wallets for verifying user identities, leveraging the security benefits of PKI.
- **End-to-End Encrypted Messaging**: Ensuring message content is accessible only to the intended recipient by using asymmetric encryption techniques.
- **Gas Optimization Strategies**: To make the platform cost-effective, gas optimization techniques are researched and implemented, focusing on reducing fees for smart contract interactions.

## Tools & Technologies

- **Blockchain**: Ethereum-compatible blockchain (Polygon or Ethereum mainnet).
- **Thirdweb SDK**: For smart contract deployment, wallet connections, and easier integration.
- **React & Next.js**: For the user-facing interface.
- **Solidity**: Smart contract programming language.
- **Crypto Wallets**: Integration with MetaMask and other Ethereum wallets.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/decentralized-messaging-app.git
   ```
2. Install dependencies:
   ```bash
   cd decentralized-messaging-app
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```
4. Access the application at `http://localhost:3000`.

## How to Use

- **Connect Wallet**: Click on "Connect Wallet" to sign in with your Ethereum wallet (e.g., MetaMask).
- **Send Messages**: Use the interface to send a message to another verified wallet address. Messages are encrypted and stored securely on-chain.
- **View Messages**: Receive and decrypt messages using your private key, ensuring end-to-end privacy.

## Future Work

- **Scalability**: Research the use of Layer-2 scaling solutions to make the platform even more cost-effective.
- **Enhanced User Experience**: Improve the messaging interface and explore mobile compatibility.
- **Off-Chain Messaging**: Consider hybrid solutions to move some interactions off-chain for reduced costs while retaining privacy and security.

## Contributing

We welcome contributions to this project. Please submit pull requests and ensure that your code follows our style guide. Open issues to discuss potential improvements or report bugs.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or further information, please contact:

- **Yitan Li**: [yl9314@nyu.edu](mailto:y9314@nyu.edu)
- **Bruce Chen**: [yc5508@nyu.edu](mailto:yc5508@nyu.edu)
- **Professor Lihua Xu**: Project Supervisor
