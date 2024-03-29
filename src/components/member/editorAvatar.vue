<template>
  <div>
    <el-dialog
      title=""
      destroy-on-close
      :model-value="props.modelValue"
      custom-class="dialog"
      @close="close"
    >
      <div class="flex justify-center">
        <div v-if="imageUrl" class="w-[400px] h-[400px]">
          <vue-cropper
            ref="cropper"
            :img="imageUrl"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :fixed="true"
            :high="option.high"
            mode="cover"
            :max-img-size="option.max"
          />
          <div class="flex justify-end">
            <a href="javascript:;" class="text-2xl" @click="imageUrl = ''">x</a>
          </div>
        </div>
        <el-upload
          v-else
          class="upload"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarSuccess"
        >
          <section theme="outline" size="30" />
        </el-upload>
      </div>
      <template #footer>
        <span>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="sub">確定</el-button>
        </span>
      </template>
      <Teleport to="body">
        <div
          class="absolute top-0 left-0 w-screen h-screen z-[9999]"
          v-loading="loading"
          v-show="loading"
        ></div>
      </Teleport>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { UploadProps, UploadFile } from "element-plus";
import { VueCropper } from "vue-cropper";
import { firebaseStores } from "@/stores/firebaseStore";
import { storageStores } from "@/stores/storageStore";
import userStores from "@/stores/userStore";
import "vue-cropper/dist/index.css";

export interface IProps {
  modelValue?: boolean;
  userAccount?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  userAccount: "",
});
const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
  imageUrl.value = "";
};
// loading
const loading = ref(false);

// 上傳照片
const imageUrl = ref("");
const handleAvatarSuccess: UploadProps["onChange"] = (
  response,
  uploadFile: any
) => {
  if (
    response.raw?.type !== "image/jpeg" &&
    response.raw?.type !== "image/png"
  ) {
    ElMessage.error("上傳的檔案類型不符合(jpg, png)");
    return false;
  } else if (response.raw.size / 1024 / 1024 > 2) {
    ElMessage.error("上傳的檔案大小不能超過 2MB");
    return false;
  }
  imageUrl.value = URL.createObjectURL(new Blob([uploadFile.pop().raw]));
};

const cropper = ref<typeof VueCropper>();
const option = ref({
  size: 1,
  full: false,
  outputType: "png",
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 200,
  autoCropHeight: 200,
  centerBox: false,
  high: true,
  max: 99999,
});

const firebaseStore = firebaseStores();
const storageStore = storageStores();
const userStore = userStores();

const sub = () => {
  if (imageUrl.value == "") {
    ElMessage.error("沒添加照片");
    close();
  }
  cropper.value?.getCropBlob(async (data: Blob) => {
    console.log(data);
    loading.value = true;
    await storageStore.upload(data, `users/${props.userAccount}`).then(() => {
      storageStore.getURL(`users/${props.userAccount}`).then((url) => {
        firebaseStore
          .update("users", props.userAccount, { avatar: url })
          .then(async () => {
            await userStore.photo("users", props.userAccount);
            close();
            loading.value = false;
            // location.reload();
          });

        // ElMessage.success("修改成功！請重新整理頁面");
      });
    });
  });
};
</script>

<style scoped lang="scss">
:deep(.dialog) {
  @apply w-full md:max-w-[500px] h-[600px] flex flex-col justify-between items-center;
}

:deep(.upload .el-upload) {
  @apply w-[400px] h-[400px] flex justify-center items-center rounded-md cursor-pointer relative overflow-hidden;
  border: 1px dashed var(--hd-black1);
  transition: var(--el-transition-duration-fast);
  &:hover,
  &:focus {
    border-color: var(--ft-color);
    color: var(--ft-color);
  }
}
</style>
