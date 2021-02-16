const drawCloud = (ctx) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.strokeRect(100, 10, 420, 270);
    ctx.fillRect(100, 10, 420, 270);
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText('Ура вы победили!', 120, 30);
    ctx.fillText('Список результатов:', 120, 50);
}

const getMaxValue = (times) => {
    var max = -1;
    var maxIndex = -1;

    for (var i = 0 ; i < times.length; i++) {
        var time = times[i];
        if (time > max) {
            max = time;
            maxIndex = i;
        }
    }
    return max;
}

window.renderStatistics = function (ctx, names, times) {
    drawCloud(ctx);
    var max = getMaxValue(times);

    var histogramHeight = 150;
    var ratio = histogramHeight / max;
    var barWidth = 40;
    var indent = 90;
    var initialY = 240;
    var initialX = 140;
    
    for(var i = 0; i < times.length; i++) {
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillText(names[i], initialX + indent * i, initialY + 10);
        ctx.fillText(Math.floor(times[i]), initialX + indent * i, initialY - Math.floor(times[i] * ratio) - 20);
        if (names[i] === 'Вы') {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fillRect(initialX + indent * i, initialY, barWidth , -times[i] * ratio);
        } else {
            ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
            ctx.fillRect(initialX + indent * i, initialY, barWidth , -times[i] * ratio);
        }
    }
}
