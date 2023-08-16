#[system]
mod InitAccount {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use poseidon::poseidon_hash_span;

    use dojo::world::Context;

    use DevilCell::utils::constants::{GAME_ID,WORLD_ID};  
 
    use DevilCell::components::worldInfo::{WorldInfo};
    use DevilCell::components::account::{Account};

    fn execute(ctx: Context) {

        let mut account_key_arr:Array<felt252> = ArrayTrait::new();
        account_key_arr.append(3);
        account_key_arr.append(GAME_ID);
        account_key_arr.append(WORLD_ID);
        account_key_arr.append(ctx.origin.into());
 
        let account_key = poseidon::poseidon_hash_span(account_key_arr.span());
        
        let mut account = get !(
            ctx.world,
            account_key, 
            Account
        );

        assert(account.init == false, 'account already register');

        account.init = true;
        set !(
            ctx.world,
            (account)
        )

        return ();
    }
}
 