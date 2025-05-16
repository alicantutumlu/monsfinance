export const Abi_Supply = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenSymbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ECDSAInvalidSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "length",
                "type": "uint256"
            }
        ],
        "name": "ECDSAInvalidSignatureLength",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "ECDSAInvalidSignatureS",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "ERC2612ExpiredSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "signer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC2612InvalidSigner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "EnforcedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ExpectedPause",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "currentNonce",
                "type": "uint256"
            }
        ],
        "name": "InvalidAccountNonce",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidShortString",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "str",
                "type": "string"
            }
        ],
        "name": "StringTooLong",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "EIP712DomainChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eip712Domain",
        "outputs": [
            {
                "internalType": "bytes1",
                "name": "fields",
                "type": "bytes1"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "version",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "chainId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "verifyingContract",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            },
            {
                "internalType": "uint256[]",
                "name": "extensions",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "nonces",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const Binary_Supply = "6101606040523480156200001257600080fd5b50604051620032db380380620032db83398181016040528101906200003891906200098b565b82806040518060400160405280600181526020017f3100000000000000000000000000000000000000000000000000000000000000815250868686816003908162000084919062000c7c565b50806004908162000096919062000c7c565b5050506000600560006101000a81548160ff021916908315150217905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620001295760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040162000120919062000d74565b60405180910390fd5b6200013a816200020860201b60201c565b5062000151600683620002ce60201b90919060201c565b61012081815250506200016f600782620002ce60201b90919060201c565b6101408181525050818051906020012060e08181525050808051906020012061010081815250504660a08181525050620001ae6200032660201b60201c565b608081815250503073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1681525050505050620001fe33826200038360201b60201c565b5050505062000ff6565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000602083511015620002f457620002ec836200041060201b60201c565b905062000320565b8262000306836200047d60201b60201c565b600001908162000317919062000c7c565b5060ff60001b90505b92915050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60e0516101005146306040516020016200036895949392919062000dbd565b60405160208183030381529060405280519060200120905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620003f85760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401620003ef919062000d74565b60405180910390fd5b6200040c600083836200048760201b60201c565b5050565b600080829050601f815111156200046057826040517f305a27a900000000000000000000000000000000000000000000000000000000815260040162000457919062000e6c565b60405180910390fd5b8051816200046e9062000ec2565b60001c1760001b915050919050565b6000819050919050565b6200049a8383836200049f60201b60201c565b505050565b620004af620004c760201b60201c565b620004c28383836200051160201b60201c565b505050565b620004d76200074160201b60201c565b156200050f576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603620005675780600260008282546200055a919062000f61565b925050819055506200063d565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015620005f6578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620005ed9392919062000f9c565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620006885780600260008282540392505081905550620006d5565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000734919062000fd9565b60405180910390a3505050565b6000600560009054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000799826200076c565b9050919050565b620007ab816200078c565b8114620007b757600080fd5b50565b600081519050620007cb81620007a0565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200082682620007db565b810181811067ffffffffffffffff82111715620008485762000847620007ec565b5b80604052505050565b60006200085d62000758565b90506200086b82826200081b565b919050565b600067ffffffffffffffff8211156200088e576200088d620007ec565b5b6200089982620007db565b9050602081019050919050565b60005b83811015620008c6578082015181840152602081019050620008a9565b60008484015250505050565b6000620008e9620008e38462000870565b62000851565b905082815260208101848484011115620009085762000907620007d6565b5b62000915848285620008a6565b509392505050565b600082601f830112620009355762000934620007d1565b5b815162000947848260208601620008d2565b91505092915050565b6000819050919050565b620009658162000950565b81146200097157600080fd5b50565b60008151905062000985816200095a565b92915050565b60008060008060808587031215620009a857620009a762000762565b5b6000620009b887828801620007ba565b945050602085015167ffffffffffffffff811115620009dc57620009db62000767565b5b620009ea878288016200091d565b935050604085015167ffffffffffffffff81111562000a0e5762000a0d62000767565b5b62000a1c878288016200091d565b925050606062000a2f8782880162000974565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168062000a8e57607f821691505b60208210810362000aa45762000aa362000a46565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830262000b0e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000acf565b62000b1a868362000acf565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000b5d62000b5762000b518462000950565b62000b32565b62000950565b9050919050565b6000819050919050565b62000b798362000b3c565b62000b9162000b888262000b64565b84845462000adc565b825550505050565b600090565b62000ba862000b99565b62000bb581848462000b6e565b505050565b5b8181101562000bdd5762000bd160008262000b9e565b60018101905062000bbb565b5050565b601f82111562000c2c5762000bf68162000aaa565b62000c018462000abf565b8101602085101562000c11578190505b62000c2962000c208562000abf565b83018262000bba565b50505b505050565b600082821c905092915050565b600062000c516000198460080262000c31565b1980831691505092915050565b600062000c6c838362000c3e565b9150826002028217905092915050565b62000c878262000a3b565b67ffffffffffffffff81111562000ca35762000ca2620007ec565b5b62000caf825462000a75565b62000cbc82828562000be1565b600060209050601f83116001811462000cf4576000841562000cdf578287015190505b62000ceb858262000c5e565b86555062000d5b565b601f19841662000d048662000aaa565b60005b8281101562000d2e5784890151825560018201915060208501945060208101905062000d07565b8683101562000d4e578489015162000d4a601f89168262000c3e565b8355505b6001600288020188555050505b505050505050565b62000d6e816200078c565b82525050565b600060208201905062000d8b600083018462000d63565b92915050565b6000819050919050565b62000da68162000d91565b82525050565b62000db78162000950565b82525050565b600060a08201905062000dd4600083018862000d9b565b62000de3602083018762000d9b565b62000df2604083018662000d9b565b62000e01606083018562000dac565b62000e10608083018462000d63565b9695505050505050565b600082825260208201905092915050565b600062000e388262000a3b565b62000e44818562000e1a565b935062000e56818560208601620008a6565b62000e6181620007db565b840191505092915050565b6000602082019050818103600083015262000e88818462000e2b565b905092915050565b600081519050919050565b6000819050602082019050919050565b600062000eb9825162000d91565b80915050919050565b600062000ecf8262000e90565b8262000edb8462000e9b565b905062000ee88162000eab565b9250602082101562000f2b5762000f267fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8360200360080262000acf565b831692505b5050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000f6e8262000950565b915062000f7b8362000950565b925082820190508082111562000f965762000f9562000f32565b5b92915050565b600060608201905062000fb3600083018662000d63565b62000fc2602083018562000dac565b62000fd1604083018462000dac565b949350505050565b600060208201905062000ff0600083018462000dac565b92915050565b60805160a05160c05160e05161010051610120516101405161228a620010516000396000610fdb01526000610fa0015260006112db015260006112ba01526000610b8401526000610bda01526000610c03015261228a6000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063715018a6116100b85780638da5cb5b1161007c5780638da5cb5b1461033357806395d89b4114610351578063a9059cbb1461036f578063d505accf1461039f578063dd62ed3e146103bb578063f2fde38b146103eb57610142565b8063715018a6146102af57806379cc6790146102b95780637ecebe00146102d55780638456cb591461030557806384b0196e1461030f57610142565b80633644e5151161010a5780633644e515146102015780633f4ba83a1461021f57806340c10f191461022957806342966c68146102455780635c975abb1461026157806370a082311461027f57610142565b806306fdde0314610147578063095ea7b31461016557806318160ddd1461019557806323b872dd146101b3578063313ce567146101e3575b600080fd5b61014f610407565b60405161015c9190611a86565b60405180910390f35b61017f600480360381019061017a9190611b41565b610499565b60405161018c9190611b9c565b60405180910390f35b61019d6104bc565b6040516101aa9190611bc6565b60405180910390f35b6101cd60048036038101906101c89190611be1565b6104c6565b6040516101da9190611b9c565b60405180910390f35b6101eb6104f5565b6040516101f89190611c50565b60405180910390f35b6102096104fe565b6040516102169190611c84565b60405180910390f35b61022761050d565b005b610243600480360381019061023e9190611b41565b61051f565b005b61025f600480360381019061025a9190611c9f565b610535565b005b610269610549565b6040516102769190611b9c565b60405180910390f35b61029960048036038101906102949190611ccc565b610560565b6040516102a69190611bc6565b60405180910390f35b6102b76105a8565b005b6102d360048036038101906102ce9190611b41565b6105bc565b005b6102ef60048036038101906102ea9190611ccc565b6105dc565b6040516102fc9190611bc6565b60405180910390f35b61030d6105ee565b005b610317610600565b60405161032a9796959493929190611e01565b60405180910390f35b61033b6106aa565b6040516103489190611e85565b60405180910390f35b6103596106d4565b6040516103669190611a86565b60405180910390f35b61038960048036038101906103849190611b41565b610766565b6040516103969190611b9c565b60405180910390f35b6103b960048036038101906103b49190611ef8565b610789565b005b6103d560048036038101906103d09190611f9a565b6108d1565b6040516103e29190611bc6565b60405180910390f35b61040560048036038101906104009190611ccc565b610958565b005b60606003805461041690612009565b80601f016020809104026020016040519081016040528092919081815260200182805461044290612009565b801561048f5780601f106104645761010080835404028352916020019161048f565b820191906000526020600020905b81548152906001019060200180831161047257829003601f168201915b5050505050905090565b6000806104a46109de565b90506104b18185856109e6565b600191505092915050565b6000600254905090565b6000806104d16109de565b90506104de8582856109f8565b6104e9858585610a8c565b60019150509392505050565b60006012905090565b6000610508610b80565b905090565b610515610c37565b61051d610cbe565b565b610527610c37565b6105318282610d21565b5050565b6105466105406109de565b82610da3565b50565b6000600560009054906101000a900460ff16905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6105b0610c37565b6105ba6000610e25565b565b6105ce826105c86109de565b836109f8565b6105d88282610da3565b5050565b60006105e782610eeb565b9050919050565b6105f6610c37565b6105fe610f34565b565b600060608060008060006060610614610f97565b61061c610fd2565b46306000801b600067ffffffffffffffff81111561063d5761063c61203a565b5b60405190808252806020026020018201604052801561066b5781602001602082028036833780820191505090505b507f0f00000000000000000000000000000000000000000000000000000000000000959493929190965096509650965096509650965090919293949596565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546106e390612009565b80601f016020809104026020016040519081016040528092919081815260200182805461070f90612009565b801561075c5780601f106107315761010080835404028352916020019161075c565b820191906000526020600020905b81548152906001019060200180831161073f57829003601f168201915b5050505050905090565b6000806107716109de565b905061077e818585610a8c565b600191505092915050565b834211156107ce57836040517f627913020000000000000000000000000000000000000000000000000000000081526004016107c59190611bc6565b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886107fd8c61100d565b8960405160200161081396959493929190612069565b604051602081830303815290604052805190602001209050600061083682611064565b905060006108468287878761107e565b90508973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108ba57808a6040517f4b800e460000000000000000000000000000000000000000000000000000000081526004016108b19291906120ca565b60405180910390fd5b6108c58a8a8a6109e6565b50505050505050505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610960610c37565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036109d25760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016109c99190611e85565b60405180910390fd5b6109db81610e25565b50565b600033905090565b6109f383838360016110ae565b505050565b6000610a0484846108d1565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a865781811015610a76578281836040517ffb8f41b2000000000000000000000000000000000000000000000000000000008152600401610a6d939291906120f3565b60405180910390fd5b610a85848484840360006110ae565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610afe5760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610af59190611e85565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b705760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610b679190611e85565b60405180910390fd5b610b7b838383611285565b505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16148015610bfc57507f000000000000000000000000000000000000000000000000000000000000000046145b15610c29577f00000000000000000000000000000000000000000000000000000000000000009050610c34565b610c31611295565b90505b90565b610c3f6109de565b73ffffffffffffffffffffffffffffffffffffffff16610c5d6106aa565b73ffffffffffffffffffffffffffffffffffffffff1614610cbc57610c806109de565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610cb39190611e85565b60405180910390fd5b565b610cc661132b565b6000600560006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610d0a6109de565b604051610d179190611e85565b60405180910390a1565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d935760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610d8a9190611e85565b60405180910390fd5b610d9f60008383611285565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e155760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610e0c9190611e85565b60405180910390fd5b610e2182600083611285565b5050565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610f3c61136b565b6001600560006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610f806109de565b604051610f8d9190611e85565b60405180910390a1565b6060610fcd60067f00000000000000000000000000000000000000000000000000000000000000006113ac90919063ffffffff16565b905090565b606061100860077f00000000000000000000000000000000000000000000000000000000000000006113ac90919063ffffffff16565b905090565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600101919050559050919050565b6000611077611071610b80565b8361145c565b9050919050565b6000806000806110908888888861149d565b9250925092506110a08282611591565b829350505050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036111205760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016111179190611e85565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036111925760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016111899190611e85565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550801561127f578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516112769190611bc6565b60405180910390a35b50505050565b6112908383836116f5565b505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000463060405160200161131095949392919061212a565b60405160208183030381529060405280519060200120905090565b611333610549565b611369576040517f8dfc202b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b611373610549565b156113aa576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b606060ff60001b83146113c9576113c28361170d565b9050611456565b8180546113d590612009565b80601f016020809104026020016040519081016040528092919081815260200182805461140190612009565b801561144e5780601f106114235761010080835404028352916020019161144e565b820191906000526020600020905b81548152906001019060200180831161143157829003601f168201915b505050505090505b92915050565b60006040517f190100000000000000000000000000000000000000000000000000000000000081528360028201528260228201526042812091505092915050565b60008060007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08460001c11156114dd576000600385925092509250611587565b600060018888888860405160008152602001604052604051611502949392919061217d565b6020604051602081039080840390855afa158015611524573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361157857600060016000801b93509350935050611587565b8060008060001b935093509350505b9450945094915050565b600060038111156115a5576115a46121c2565b5b8260038111156115b8576115b76121c2565b5b03156116f157600160038111156115d2576115d16121c2565b5b8260038111156115e5576115e46121c2565b5b0361161c576040517ff645eedf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260038111156116305761162f6121c2565b5b826003811115611643576116426121c2565b5b03611688578060001c6040517ffce698f700000000000000000000000000000000000000000000000000000000815260040161167f9190611bc6565b60405180910390fd5b60038081111561169b5761169a6121c2565b5b8260038111156116ae576116ad6121c2565b5b036116f057806040517fd78bce0c0000000000000000000000000000000000000000000000000000000081526004016116e79190611c84565b60405180910390fd5b5b5050565b6116fd61136b565b611708838383611781565b505050565b6060600061171a836119a6565b90506000602067ffffffffffffffff8111156117395761173861203a565b5b6040519080825280601f01601f19166020018201604052801561176b5781602001600182028036833780820191505090505b5090508181528360208201528092505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036117d35780600260008282546117c79190612220565b925050819055506118a6565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561185f578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401611856939291906120f3565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036118ef578060026000828254039250508190555061193c565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516119999190611bc6565b60405180910390a3505050565b60008060ff8360001c169050601f8111156119ed576040517fb3512b0c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80915050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611a30578082015181840152602081019050611a15565b60008484015250505050565b6000601f19601f8301169050919050565b6000611a58826119f6565b611a628185611a01565b9350611a72818560208601611a12565b611a7b81611a3c565b840191505092915050565b60006020820190508181036000830152611aa08184611a4d565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611ad882611aad565b9050919050565b611ae881611acd565b8114611af357600080fd5b50565b600081359050611b0581611adf565b92915050565b6000819050919050565b611b1e81611b0b565b8114611b2957600080fd5b50565b600081359050611b3b81611b15565b92915050565b60008060408385031215611b5857611b57611aa8565b5b6000611b6685828601611af6565b9250506020611b7785828601611b2c565b9150509250929050565b60008115159050919050565b611b9681611b81565b82525050565b6000602082019050611bb16000830184611b8d565b92915050565b611bc081611b0b565b82525050565b6000602082019050611bdb6000830184611bb7565b92915050565b600080600060608486031215611bfa57611bf9611aa8565b5b6000611c0886828701611af6565b9350506020611c1986828701611af6565b9250506040611c2a86828701611b2c565b9150509250925092565b600060ff82169050919050565b611c4a81611c34565b82525050565b6000602082019050611c656000830184611c41565b92915050565b6000819050919050565b611c7e81611c6b565b82525050565b6000602082019050611c996000830184611c75565b92915050565b600060208284031215611cb557611cb4611aa8565b5b6000611cc384828501611b2c565b91505092915050565b600060208284031215611ce257611ce1611aa8565b5b6000611cf084828501611af6565b91505092915050565b60007fff0000000000000000000000000000000000000000000000000000000000000082169050919050565b611d2e81611cf9565b82525050565b611d3d81611acd565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611d7881611b0b565b82525050565b6000611d8a8383611d6f565b60208301905092915050565b6000602082019050919050565b6000611dae82611d43565b611db88185611d4e565b9350611dc383611d5f565b8060005b83811015611df4578151611ddb8882611d7e565b9750611de683611d96565b925050600181019050611dc7565b5085935050505092915050565b600060e082019050611e16600083018a611d25565b8181036020830152611e288189611a4d565b90508181036040830152611e3c8188611a4d565b9050611e4b6060830187611bb7565b611e586080830186611d34565b611e6560a0830185611c75565b81810360c0830152611e778184611da3565b905098975050505050505050565b6000602082019050611e9a6000830184611d34565b92915050565b611ea981611c34565b8114611eb457600080fd5b50565b600081359050611ec681611ea0565b92915050565b611ed581611c6b565b8114611ee057600080fd5b50565b600081359050611ef281611ecc565b92915050565b600080600080600080600060e0888a031215611f1757611f16611aa8565b5b6000611f258a828b01611af6565b9750506020611f368a828b01611af6565b9650506040611f478a828b01611b2c565b9550506060611f588a828b01611b2c565b9450506080611f698a828b01611eb7565b93505060a0611f7a8a828b01611ee3565b92505060c0611f8b8a828b01611ee3565b91505092959891949750929550565b60008060408385031215611fb157611fb0611aa8565b5b6000611fbf85828601611af6565b9250506020611fd085828601611af6565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061202157607f821691505b60208210810361203457612033611fda565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060c08201905061207e6000830189611c75565b61208b6020830188611d34565b6120986040830187611d34565b6120a56060830186611bb7565b6120b26080830185611bb7565b6120bf60a0830184611bb7565b979650505050505050565b60006040820190506120df6000830185611d34565b6120ec6020830184611d34565b9392505050565b60006060820190506121086000830186611d34565b6121156020830185611bb7565b6121226040830184611bb7565b949350505050565b600060a08201905061213f6000830188611c75565b61214c6020830187611c75565b6121596040830186611c75565b6121666060830185611bb7565b6121736080830184611d34565b9695505050505050565b60006080820190506121926000830187611c75565b61219f6020830186611c41565b6121ac6040830185611c75565b6121b96060830184611c75565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061222b82611b0b565b915061223683611b0b565b925082820190508082111561224e5761224d6121f1565b5b9291505056fea26469706673582212205caa29abc95af12d715e8521f4e2d365df55610885a011b07bb17c1505f6ef6464736f6c63430008140033"