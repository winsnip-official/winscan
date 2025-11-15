# Chain Configuration Guide

This directory contains all blockchain network configurations for WinScan.

## 📁 Structure

Each chain should have its own JSON file:
```
Chains/
├── lumera-mainnet.json
├── lumera-test.json
├── paxi.json
└── your-chain.json
```

## 📝 Configuration Format

Create a JSON file with the following structure:

```json
{
  "chain_name": "your-chain-mainnet",
  "chain_id": "your-chain-1",
  "pretty_name": "Your Chain",
  "status": "live",
  "network_type": "mainnet",
  "logo": "https://raw.githubusercontent.com/your-org/chain-registry/master/yourchain/images/logo.png",
  "website": "https://yourchain.com",
  "addr_prefix": "your",
  "denom": "uyour",
  "rpc": [
    {
      "address": "https://rpc.yourchain.com",
      "provider": "Your Foundation"
    },
    {
      "address": "https://rpc-2.yourchain.com",
      "provider": "Community Node"
    }
  ],
  "api": [
    {
      "address": "https://api.yourchain.com",
      "provider": "Your Foundation"
    }
  ],
  "assets": [
    {
      "name": "Your Chain Token",
      "symbol": "YOUR",
      "denom": "uyour",
      "decimals": 6,
      "coingecko_id": "your-chain",
      "logo": "https://yourchain.com/logo.png"
    }
  ],
  "fees": {
    "fee_tokens": [
      {
        "denom": "uyour",
        "fixed_min_gas_price": 0.025,
        "low_gas_price": 0.025,
        "average_gas_price": 0.03,
        "high_gas_price": 0.04
      }
    ]
  },
  "staking": {
    "staking_tokens": [
      {
        "denom": "uyour"
      }
    ]
  }
}
```

## 🔑 Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `chain_name` | string | Unique chain identifier (lowercase, kebab-case) |
| `chain_id` | string | On-chain ID |
| `pretty_name` | string | Display name |
| `status` | string | `live`, `upcoming`, or `killed` |
| `network_type` | string | `mainnet` or `testnet` |
| `logo` | string | Logo image URL |
| `addr_prefix` | string | Bech32 address prefix |
| `rpc` | array | RPC endpoints |
| `api` | array | REST API endpoints |
| `assets` | array | Token information |

## 🌐 RPC & API Endpoints

### RPC Format
```json
{
  "address": "https://rpc.yourchain.com",
  "provider": "Your Organization"
}
```

**Requirements:**
- Must support CORS
- Must be publicly accessible
- Recommended: Enable transaction indexing (`tx_index=on`)

### API Format
```json
{
  "address": "https://api.yourchain.com",
  "provider": "Your Organization"
}
```

**Requirements:**
- Cosmos SDK REST API
- Must support CORS
- Should include all standard modules

## 💰 Asset Configuration

```json
{
  "name": "Your Token",
  "symbol": "YOUR",
  "denom": "uyour",
  "decimals": 6,
  "coingecko_id": "your-chain",
  "logo": "https://yourchain.com/logo.png"
}
```

**Fields:**
- `denom`: Base denomination (usually with `u` prefix)
- `decimals`: Number of decimal places (usually 6)
- `coingecko_id`: Optional, for price tracking

## 📋 Examples

### Mainnet Configuration
```json
{
  "chain_name": "cosmos-mainnet",
  "chain_id": "cosmoshub-4",
  "pretty_name": "Cosmos Hub",
  "status": "live",
  "network_type": "mainnet",
  "logo": "https://cosmos.network/logo.png",
  "addr_prefix": "cosmos",
  "rpc": [
    {
      "address": "https://rpc.cosmos.network",
      "provider": "Cosmos Hub"
    }
  ],
  "api": [
    {
      "address": "https://api.cosmos.network",
      "provider": "Cosmos Hub"
    }
  ],
  "assets": [
    {
      "name": "Cosmos",
      "symbol": "ATOM",
      "denom": "uatom",
      "decimals": 6
    }
  ]
}
```

### Testnet Configuration
```json
{
  "chain_name": "cosmos-testnet",
  "chain_id": "theta-testnet-001",
  "pretty_name": "Cosmos Testnet",
  "status": "live",
  "network_type": "testnet",
  "logo": "https://cosmos.network/logo.png",
  "addr_prefix": "cosmos",
  "rpc": [
    {
      "address": "https://rpc.testnet.cosmos.network",
      "provider": "Cosmos Hub"
    }
  ],
  "api": [
    {
      "address": "https://api.testnet.cosmos.network",
      "provider": "Cosmos Hub"
    }
  ],
  "assets": [
    {
      "name": "Cosmos Testnet",
      "symbol": "ATOM",
      "denom": "uatom",
      "decimals": 6
    }
  ]
}
```

## ✅ Validation

Before submitting your chain configuration:

1. **Test RPC endpoint:**
   ```bash
   curl https://rpc.yourchain.com/status
   ```

2. **Test API endpoint:**
   ```bash
   curl https://api.yourchain.com/cosmos/base/tendermint/v1beta1/node_info
   ```

3. **Validate JSON:**
   ```bash
   cat your-chain.json | jq .
   ```

4. **Check logo loads:**
   - Open logo URL in browser
   - Verify it's a valid image

## 🚀 Adding Your Chain

1. Fork the repository
2. Create your chain JSON file in `Chains/` directory
3. Test locally:
   ```bash
   npm run dev
   ```
4. Verify your chain appears in the explorer
5. Submit a Pull Request

## 📝 Naming Convention

- **Mainnet**: `chain-name-mainnet.json` or `chain-name.json`
- **Testnet**: `chain-name-test.json` or `chain-name-testnet.json`

Examples:
- ✅ `lumera-mainnet.json`
- ✅ `lumera-test.json`
- ✅ `paxi.json`
- ❌ `MyChain.json` (use lowercase)
- ❌ `my_chain.json` (use kebab-case)

## 🔍 Resources

- [Cosmos Chain Registry](https://github.com/cosmos/chain-registry)
- [Cosmos SDK Docs](https://docs.cosmos.network/)
- [Tendermint RPC Docs](https://docs.tendermint.com/v0.34/rpc/)

## ❓ Need Help?

- Check existing chain configurations for examples
- Open an issue if you need assistance
- Join our community discussions

---

**Happy configuring! 🌟**
