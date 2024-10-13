module NewInstruere::InstruereContract {
    use std::signer;
    use std::vector;

    struct Block has store {
        data: vector<u8>,
    }

    struct InstruereNetwork has key {
        blocks: vector<Block>,
    }

    struct MinerToken has key {
        value: u64,
    }

    struct EnhancedBlockData has key {
        blocks: vector<EnhancedBlock>,
    }

    struct EnhancedBlock has store {
        data: vector<u8>,
        timestamp: u64,
        miner: address,
    }

    public entry fun initialize(account: &signer) {
        move_to(account, InstruereNetwork { blocks: vector::empty() });
        move_to(account, MinerToken { value: 0 });
        move_to(account, EnhancedBlockData { blocks: vector::empty() });
    }

    public entry fun add_block_and_reward_v2(account: &signer, _miner_address: address, input: u64) acquires InstruereNetwork, MinerToken {
        if (input == 1) {
            let sender = signer::address_of(account);
            
            let network = borrow_global_mut<InstruereNetwork>(sender);
            let new_block = Block { data: b"New Block" };
            vector::push_back(&mut network.blocks, new_block);

            if (!exists<MinerToken>(sender)) {
                move_to(account, MinerToken { value: 0 });
            };

            let miner_token = borrow_global_mut<MinerToken>(sender);
            miner_token.value = miner_token.value + 1;
        }
    }

    public entry fun add_enhanced_block(account: &signer, miner_address: address, timestamp: u64) acquires EnhancedBlockData, MinerToken {
        let sender = signer::address_of(account);
        
        if (!exists<EnhancedBlockData>(sender)) {
            move_to(account, EnhancedBlockData { blocks: vector::empty() });
        };

        let enhanced_data = borrow_global_mut<EnhancedBlockData>(sender);
        let new_block = EnhancedBlock { 
            data: b"New Enhanced Block", 
            timestamp: timestamp,
            miner: miner_address,
        };
        vector::push_back(&mut enhanced_data.blocks, new_block);

        if (!exists<MinerToken>(sender)) {
            move_to(account, MinerToken { value: 0 });
        };

        let miner_token = borrow_global_mut<MinerToken>(sender);
        miner_token.value = miner_token.value + 1;
    }

    #[view]
    public fun get_enhanced_block_details(addr: address, index: u64): (vector<u8>, u64, address) acquires EnhancedBlockData {
        let enhanced_data = borrow_global<EnhancedBlockData>(addr);
        let block = vector::borrow(&enhanced_data.blocks, index);
        (block.data, block.timestamp, block.miner)
    }

    public fun get_block_count(account: &signer): u64 acquires InstruereNetwork {
        let sender = signer::address_of(account);
        let network = borrow_global<InstruereNetwork>(sender);
        vector::length(&network.blocks)
    }

    public fun get_miner_token_balance(account: &signer): u64 acquires MinerToken {
        let sender = signer::address_of(account);
        if (exists<MinerToken>(sender)) {
            borrow_global<MinerToken>(sender).value
        } else {
            0
        }
    }

    #[view]
    public fun get_miner_token_balance_by_address(addr: address): u64 acquires MinerToken {
        if (exists<MinerToken>(addr)) {
            borrow_global<MinerToken>(addr).value
        } else {
            0
        }
    }

    #[view]
    public fun get_block_count_by_address(addr: address): u64 acquires InstruereNetwork {
        let network = borrow_global<InstruereNetwork>(addr);
        vector::length(&network.blocks)
    }

    #[view]
    public fun get_enhanced_block_count(addr: address): u64 acquires EnhancedBlockData {
        if (!exists<EnhancedBlockData>(addr)) {
            return 0
        };
        let enhanced_data = borrow_global<EnhancedBlockData>(addr);
        vector::length(&enhanced_data.blocks)
    }
}