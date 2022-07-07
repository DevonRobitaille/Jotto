import { NextPage } from 'next';

interface IProps {
    eliminatedChar: Set<string>;
}

const Cheat: NextPage<IProps> = ({ eliminatedChar }) => {
    return (
        <div>Cheat</div>
    )
}

export default Cheat