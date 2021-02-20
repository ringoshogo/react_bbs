import {BarChart, Bar, XAxis, YAxis, Legend, Tooltip, CartesianGrid, ResponsiveContainer, Brush} from 'recharts';

import classes from './Chart.module.css'

/**
 * カーソルフォーカス時に詳細説明を表示する。
 * @param {}} param0 
 */
const CustomToolTip = ({active, payload, label}) => {
    if (active) {
        let {taste, appearance, condition} = "";
        if(payload) {
            taste = payload[0].value
            appearance = payload[1].value
            condition = payload[2].value
        }
        return (
          <div className={classes.CustomToolTip}>
            <h5 className="label">{`${label}日経過`}</h5>
            <h5 className="label">{`味：${taste}`}</h5>
            <h5 className="label">{`見た目：${appearance}`}</h5>
            <h5 className="label">{`食後の健康：${condition}`}</h5>
          </div>
        );
    }
    return null;

    }

const renderLineChart = props => {
    return(
        <ResponsiveContainer width="90%" height={200}>
            <BarChart data={props.data} margin={{top: 0, right:5, bottom:5, left:0}} barSize={10}>
                {/* 純粋なライン */}
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                {/* X座標 Y座標 */}
                <XAxis dataKey="name" name="expire_date" unit="日"/>
                <YAxis ticks={[1,2,3,4,5]} tickCount={0.5}/>
                {/* マウスオーバーで補足説明 */}
                <Tooltip content={<CustomToolTip />}/>
                {/* 凡例 */}
                <Legend width="inherit"/>
                {/* 表示範囲の調整 */}
                <Brush dataKey="name" height={20} endIndex={6}/>
                {/* バー */}
                <Bar dataKey='taste' name="味" fill="#FFC107" />
                <Bar dataKey='appearance' name="見た目" fill="#40C4FF" />
                <Bar dataKey='condition' name="食後の健康" fill="#C2185B" />
                
            </BarChart>
        </ResponsiveContainer>
);
}
export default renderLineChart;