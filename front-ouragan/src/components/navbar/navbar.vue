
<template>
    <div class="navbar-component">
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="container-fluid">

                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#live">Live</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#archive">Archive</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#compareLive">Compare Live</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#compareArchive">Compare Archive</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#map">Map</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "NavbarComponent",
    props: {
        title: String,
        subTitle: String,
    }
};
</script>
<style></style>

