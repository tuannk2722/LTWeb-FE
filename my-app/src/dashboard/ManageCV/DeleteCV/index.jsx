import { Button, message, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteCVById } from "../../../components/services/cv";

function DeleteCV(props) {
    const { record, onReload } = props;
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Xóa CV thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            type: "error",
            content: "Xóa CV thất bại!"
        })
    }

    const confirm = async () => {
        const delCV = await DeleteCVById(record.id);
        if (delCV) {
            success();
            setTimeout(() => {
                onReload();
            }, 1500)
        } else {
            error();
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