import { Button, message, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteCVById } from "../../../components/services/cv";

function DeleteCV(props) {
    const { record, onReload } = props;
    const [messageApi, contextHolder] = message.useMessage();
    // console.log(record)

    const confirm = async () => {
        try {
            const response = await DeleteCVById(record._id);
            messageApi.success(response.message);
            setTimeout(() => {
                onReload();
            }, 1500)
            
        } catch(err) {
            console.log(err);
            messageApi.error(err.response.data.message);
        }
    }

    const cancel = () => error();

    return (
        <>
            {contextHolder}
            <Tooltip title="Xóa CV">
                <Popconfirm
                    title="Xóa CV"
                    description="Bạn có chắc muốn xóa CV này không?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button danger>
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default DeleteCV;