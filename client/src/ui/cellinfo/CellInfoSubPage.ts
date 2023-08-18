const { regClass, property } = Laya;

import { HomeManagerEvent } from '../../common/Config';
import { felt252ToStr } from '../../net/core/utils';
import { CellInfoSubPageBase } from './CellInfoSubPage.generated';
 
@regClass()
export class CellInfoSubPage extends CellInfoSubPageBase {
    index:number;
    onAwake() {
        this.enhance_button.on(Laya.Event.CLICK,this,this.onEnhanceButtonEvent.bind(this));
        this.play_button.on(Laya.Event.CLICK,this,this.onPlayButtonEvent.bind(this));
    }
    
    SetData(index:number,baseInfo:any,propertyInfo:any){
        this.index = index;
        this.name_cur_value_label.text = felt252ToStr(baseInfo.name);
        this.exp_cur_value_label.text = baseInfo.exp;
        this.type_cur_value_label.text = baseInfo.category;
        this.bodysize_cur_value_label.text = baseInfo.body_size;
        this.bread_count_cur_value_label.text = baseInfo.bread_count;

        this.attack_cur_value_label.text = propertyInfo.p1;
        this.agility_cur_value_label.text = propertyInfo.p2;
        this.perception_cur_value_label.text = propertyInfo.p3;

        
    }
    onEnhanceButtonEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnEnhanceCellBodySize,this.index);  
    }
    onPlayButtonEvent(param: any): void {
        Laya.stage.event(HomeManagerEvent.OnPlayGame,this.index);  
    }
}