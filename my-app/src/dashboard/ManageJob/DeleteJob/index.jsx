import { Button, message, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteInfoJob, GetJob } from "../../../components/services/jobs";

function DeleteJob(props) {
    const { record, onReload } = props;
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Xóa thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            typ: "error",
            content: "Xóa không thành công!"
        })
    }

    const confirm = async () => {
        const job = await GetJob("token", record.token);
        const deleteJobAction = await DeleteInfoJob(job[0].id);
        if (deleteJobAction) {
            success();
            setTimeout(() => {
                onReload();
            }, 1500)
        } else {
            error();
        }
    }

    const cancel = () => {
        error();
    }

    return (
        <>
            {contextHolder}
            <Tooltip title="Xóa job">
                <Popconfirm
                    title="Xóa công việc"
                    description="Bạn có chắc muốn xóa công việc này không?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button danger >
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </Tooltip>
        </>
    )
}
export default DeleteJob;