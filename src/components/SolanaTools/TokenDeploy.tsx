import { FC, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import {
  percentAmount,
  generateSigner,
  createGenericFileFromBrowserFile,
  GenericFile,
  publicKey,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createAndMint,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { AuthorityType, setAuthority } from "@metaplex-foundation/mpl-toolbox";
import CustomToast from "../CustomToast";
import { getConnection } from "../../utils/getConnection";
import { useNetworkConfiguration } from "../../context/NetworkConfigurationProvider";

interface TokenDeployProps {
  onCreateReady?: (createFn: () => Promise<void>) => void;
}

const TokenDeploy: FC<TokenDeployProps> = ({ onCreateReady }) => {
  const wallet = useWallet();
  const networkConfig = useNetworkConfiguration();
  const networkSelected = networkConfig.networkConfiguration;

  const [connection, setConnection] = useState<any>();
  const [quantity, setQuantity] = useState<number>(0);
  const [decimals, setDecimals] = useState<number>(9);
  const [tokenName, setTokenName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [metadataURL, setMetadataURL] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [disableMintIsChecked, setDisableMintIsChecked] =
    useState<boolean>(false);
  const [tokenDescription, setTokenDescription] = useState<string>("");
  const [file, setFile] = useState<GenericFile>();
  const [fileName, setFileName] = useState<string>("");
  const [iscreating, setIscreating] = useState<boolean>(false);

  useEffect(() => {
    const connection = getConnection(networkSelected);
    setConnection(connection);
  }, [networkConfig]);

  const handleFileChange = async (event: any) => {
    const browserFile = event.target.files[0];
    const _file = await createGenericFileFromBrowserFile(browserFile);
    setFile(_file);
    setFileName(_file.fileName);
  };

  const create = async () => {
    console.log("create");
    try {
      setIscreating(true);
      const umi = createUmi(connection);

      if (networkSelected === "devnet") {
        umi.use(irysUploader({ address: "https://devnet.irys.xyz" }));
      } else {
        umi.use(irysUploader({ address: "https://node1.irys.xyz/" }));
      }

      umi.use(mplTokenMetadata()).use(walletAdapterIdentity(wallet));

      const mint = generateSigner(umi);
      const owner: any = wallet.publicKey;

      let URI: string = "";

      if (file) {
        const [ImageUri] = await umi.uploader.upload([file]);
        if (ImageUri) {
          const correctURI =
            networkSelected === "devnet"
              ? ImageUri.replace(
                  "https://arweave.net",
                  "https://devnet.irys.xyz"
                )
              : ImageUri.replace(
                  "https://arweave.net",
                  "https://node1.irys.xyz"
                );
          const uri = await umi.uploader.uploadJson({
            name: tokenName,
            symbol: symbol,
            description: tokenDescription,
            image: correctURI,
          });
          if (uri) {
            URI =
              networkSelected === "devnet"
                ? uri.replace("https://arweave.net", "https://devnet.irys.xyz")
                : uri.replace("https://arweave.net", "https://node1.irys.xyz");
          }
        }
      } else {
        setIscreating(false);
        CustomToast("error", "Please provide an image file!");
        return;
      }

      if (URI !== "") {
        const ixs = [];

        if (disableMintIsChecked) {
          console.log("disable mint");
          ixs.push(
            setAuthority(umi, {
              authorityType: AuthorityType.MintTokens,
              newAuthority: null,
              owned: mint.publicKey,
              owner: umi.identity,
            })
          );
        }

        if (!isChecked) {
          console.log("disable freeze");
          ixs.push(
            setAuthority(umi, {
              authorityType: AuthorityType.FreezeAccount,
              newAuthority: null,
              owned: mint.publicKey,
              owner: umi.identity,
            })
          );
        }

        const tx = await createAndMint(umi, {
          mint,
          name: tokenName,
          symbol: symbol,
          uri: URI,
          sellerFeeBasisPoints: percentAmount(0),
          decimals: decimals,
          amount: quantity * 10 ** decimals,
          tokenOwner: publicKey(owner),
          tokenStandard: TokenStandard.Fungible,
        })
          .add(ixs)
          .sendAndConfirm(umi, { confirm: { commitment: "confirmed" } });

        const signature = base58.deserialize(tx.signature)[0];
        console.log(signature);
        CustomToast("success", `Success! txid: ${signature}`);
        setIscreating(false);
      }
    } catch (error) {
      setIscreating(false);
      const err = (error as any)?.message;
      CustomToast("error", err);
    }
  };

  // create fonksiyonunu üst bileşene ilet
  useEffect(() => {
    if (onCreateReady) {
      onCreateReady(create);
    }
  }, [onCreateReady, create]);

  return (
    <div className="">
      <div className="d-flex flex-column gap-3 p-2">
        <h1 className="text-center text-18 mt-2 purple">
          Create your own token
        </h1>
        <div className="my-2 uppercase   flex font-bold text-2xl">
          Token infos
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="w-100">
            <label className="flex text-14 purple mb-2">Token Name</label>
            <input
              className="custom-input px-2"
              type="text"
              placeholder="Token Name"
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>
          <div className="w-100">
            <label className=" mb-2 flex text-14 purple">Symbol</label>
            <input
              className="custom-input px-2"
              type="text"
              placeholder="Symbol"
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="w-100">
            {" "}
            <label className="mb-2 flex text-14 purple">
              Number of tokens to mint
            </label>
            <input
              className="custom-input px-2"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="w-100">
            {" "}
            <label className="mb-2 flex text-14 purple">
              Number of decimals
            </label>
            <input
              className="custom-input px-2"
              type="number"
              min="0"
              value={decimals}
              onChange={(e) => setDecimals(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="  uppercase   flex font-bold text-2xl">Metadatas</div>

        <div>
          <div>
            <label className="mb-2 flex text-14 purple">Description</label>
            <input
              className="custom-input px-2"
              type="text"
              placeholder="Description of the token/project"
              onChange={(e) => setTokenDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <div>
            <label className="mb-2 flex text-14 purple">Image</label>
            <div className="flex justify-center">
              <label
                htmlFor="file"
                className="mx-2 py-1 px-2 bg-[#81eff0]  rounded-sm text-black   uppercase hover:cursor-pointer">
                Upload image
                <input
                  id="file"
                  type="file"
                  name="file"
                  accept="image/*, video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {fileName != "" && (
              <div className=" flex justify-center mt-2">{fileName}</div>
            )}
          </div>
          <div>
            <div className="  mb-2 flex text-14 purple   ">Authority</div>
            <div className="">
              <label className="mx-2">Enable freeze authority</label>
              <input
                className="mx-2"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(!isChecked)}
              />
            </div>
            <div className="">
              <label className="mx-2">Disable mint authority</label>
              <input
                className="mx-2"
                type="checkbox"
                checked={disableMintIsChecked}
                onChange={(e) => setDisableMintIsChecked(!disableMintIsChecked)}
              />
            </div>
          </div>
        </div>

        {iscreating ? (
          <button className="mx-2 font-bold text-lg py-1 px-2 bg-[#312d29] border border-[#c8ab6e] rounded-xl">
            <svg
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Creating...
          </button>
        ) : (
          <button
            className="mx-2 font-bold text-lg py-1 px-2 bg-[#312d29] border border-[#c8ab6e] rounded-xl"
            onClick={create}>
            Create Token
          </button>
        )}
      </div>
    </div>
  );
};

export default TokenDeploy;
